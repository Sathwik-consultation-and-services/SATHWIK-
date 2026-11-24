import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { ABOUT_PAGE_ID, BLOCK_KINDS, SECTION_TYPES } from "./defaultContent.js";
import { ensureAboutContent } from "./seedAbout.js";

const ALLOWED_TYPES = new Set(Object.values(SECTION_TYPES));
const ALLOWED_BLOCK_KINDS = new Set(Object.values(BLOCK_KINDS));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asInt(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function paramId(req: Request): string | undefined {
  const value = req.params.id;
  return typeof value === "string" && value.trim() ? value : undefined;
}

const sectionInclude = {
  blocks: { orderBy: { displayOrder: "asc" as const } },
  activities: { orderBy: { displayOrder: "asc" as const } },
};

async function loadAboutPage(publicOnly: boolean) {
  await ensureAboutContent(prisma);
  return prisma.aboutPage.findUnique({
    where: { id: ABOUT_PAGE_ID },
    include: {
      sections: {
        where: publicOnly ? { visible: true, active: true } : {},
        orderBy: { displayOrder: "asc" },
        include: sectionInclude,
      },
    },
  });
}

function parseBlocks(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => {
    const block = isRecord(item) ? item : {};
    const kind = asString(block.kind, BLOCK_KINDS.PARAGRAPH);
    return {
      kind: ALLOWED_BLOCK_KINDS.has(kind as (typeof BLOCK_KINDS)[keyof typeof BLOCK_KINDS])
        ? kind
        : BLOCK_KINDS.PARAGRAPH,
      text: asString(block.text),
      displayOrder: asInt(block.displayOrder, index),
    };
  });
}

function parseActivities(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index) => {
      if (typeof item === "string") {
        return { text: item, displayOrder: index };
      }
      if (isRecord(item)) {
        return { text: asString(item.text), displayOrder: asInt(item.displayOrder, index) };
      }
      return { text: "", displayOrder: index };
    })
    .filter((item) => item.text.trim().length > 0);
}

function parseSectionInput(value: unknown, fallbackOrder: number) {
  if (!isRecord(value)) {
    throw new Error("Invalid section payload");
  }
  const type = asString(value.type, SECTION_TYPES.CUSTOM);
  if (!ALLOWED_TYPES.has(type as (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES])) {
    throw new Error("Invalid section type");
  }
  const title = asString(value.title).trim();
  const label = asString(value.label).trim();
  if (!title || !label) {
    throw new Error("Section label and title are required");
  }
  return {
    id: typeof value.id === "string" && value.id.trim() ? value.id.trim() : undefined,
    type,
    label,
    title,
    imageUrl: asString(value.imageUrl),
    imageAlt: asString(value.imageAlt),
    designation: asString(value.designation),
    qualifications: asString(value.qualifications),
    introduction: asString(value.introduction),
    experience: asString(value.experience),
    visible: asBoolean(value.visible, true),
    active: asBoolean(value.active, true),
    displayOrder: asInt(value.displayOrder, fallbackOrder),
    blocks: parseBlocks(value.blocks),
    activities: parseActivities(value.activities),
  };
}

export const getAboutPublic = async (_req: Request, res: Response) => {
  try {
    const page = await loadAboutPage(true);
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch About Us content" });
  }
};

export const getAboutAdmin = async (_req: Request, res: Response) => {
  try {
    const page = await loadAboutPage(false);
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch About Us content" });
  }
};

export const updateAboutPage = async (req: Request, res: Response) => {
  try {
    await ensureAboutContent(prisma);
    const heading = asString(req.body?.heading).trim();
    const subtitle = asString(req.body?.subtitle).trim();
    if (!heading || !subtitle) {
      return res.status(400).json({ error: "Heading and subtitle are required" });
    }

    const hasSections = Array.isArray(req.body?.sections);
    const sections = hasSections
      ? (req.body.sections as unknown[]).map((section, index) => parseSectionInput(section, index))
      : null;

    const page = await prisma.$transaction(async (tx) => {
      await tx.aboutPage.update({
        where: { id: ABOUT_PAGE_ID },
        data: { heading, subtitle },
      });

      if (sections) {
        const incomingIds = sections.map((section) => section.id).filter((id): id is string => Boolean(id));
        if (incomingIds.length > 0) {
          await tx.aboutSection.deleteMany({
            where: { pageId: ABOUT_PAGE_ID, id: { notIn: incomingIds } },
          });
        } else if (sections.length === 0) {
          await tx.aboutSection.deleteMany({ where: { pageId: ABOUT_PAGE_ID } });
        }

        for (const [index, section] of sections.entries()) {
          const data = {
            type: section.type,
            label: section.label,
            title: section.title,
            imageUrl: section.imageUrl,
            imageAlt: section.imageAlt,
            designation: section.designation,
            qualifications: section.qualifications,
            introduction: section.introduction,
            experience: section.experience,
            visible: section.visible,
            active: section.active,
            displayOrder: section.displayOrder ?? index,
          };

          const saved = section.id
            ? await tx.aboutSection.upsert({
                where: { id: section.id },
                create: { id: section.id, pageId: ABOUT_PAGE_ID, ...data },
                update: data,
              })
            : await tx.aboutSection.create({
                data: { pageId: ABOUT_PAGE_ID, ...data },
              });

          await tx.aboutBlock.deleteMany({ where: { sectionId: saved.id } });
          await tx.aboutActivity.deleteMany({ where: { sectionId: saved.id } });

          if (section.blocks.length > 0) {
            await tx.aboutBlock.createMany({
              data: section.blocks.map((block, blockIndex) => ({
                sectionId: saved.id,
                kind: block.kind,
                text: block.text,
                displayOrder: block.displayOrder ?? blockIndex,
              })),
            });
          }
          if (section.activities.length > 0) {
            await tx.aboutActivity.createMany({
              data: section.activities.map((activity, activityIndex) => ({
                sectionId: saved.id,
                text: activity.text,
                displayOrder: activity.displayOrder ?? activityIndex,
              })),
            });
          }
        }
      }

      return tx.aboutPage.findUnique({
        where: { id: ABOUT_PAGE_ID },
        include: {
          sections: {
            orderBy: { displayOrder: "asc" },
            include: sectionInclude,
          },
        },
      });
    });

    res.json(page);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Failed to update About Us content";
    res.status(400).json({ error: message });
  }
};

export const createSection = async (req: Request, res: Response) => {
  try {
    await ensureAboutContent(prisma);
    const parsed = parseSectionInput(req.body, 0);
    const last = await prisma.aboutSection.findFirst({
      where: { pageId: ABOUT_PAGE_ID },
      orderBy: { displayOrder: "desc" },
    });
    const section = await prisma.aboutSection.create({
      data: {
        pageId: ABOUT_PAGE_ID,
        type: parsed.type === SECTION_TYPES.ASSOCIATE ? SECTION_TYPES.CUSTOM : parsed.type,
        label: parsed.label,
        title: parsed.title,
        imageUrl: parsed.imageUrl,
        imageAlt: parsed.imageAlt,
        designation: parsed.designation,
        qualifications: parsed.qualifications,
        introduction: parsed.introduction,
        experience: parsed.experience,
        visible: parsed.visible,
        active: true,
        displayOrder: last ? last.displayOrder + 1 : 0,
        blocks: {
          create: parsed.blocks,
        },
        activities: {
          create: parsed.activities,
        },
      },
      include: sectionInclude,
    });
    res.status(201).json(section);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Failed to create section";
    res.status(400).json({ error: message });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const id = paramId(req);
    if (!id) return res.status(400).json({ error: "Section id is required" });
    const parsed = parseSectionInput({ ...req.body, id }, 0);
    const section = await prisma.$transaction(async (tx) => {
      const updated = await tx.aboutSection.update({
        where: { id },
        data: {
          type: parsed.type,
          label: parsed.label,
          title: parsed.title,
          imageUrl: parsed.imageUrl,
          imageAlt: parsed.imageAlt,
          designation: parsed.designation,
          qualifications: parsed.qualifications,
          introduction: parsed.introduction,
          experience: parsed.experience,
          visible: parsed.visible,
          active: parsed.active,
          displayOrder: parsed.displayOrder,
        },
      });
      await tx.aboutBlock.deleteMany({ where: { sectionId: id } });
      await tx.aboutActivity.deleteMany({ where: { sectionId: id } });
      if (parsed.blocks.length > 0) {
        await tx.aboutBlock.createMany({
          data: parsed.blocks.map((block) => ({ ...block, sectionId: id })),
        });
      }
      if (parsed.activities.length > 0) {
        await tx.aboutActivity.createMany({
          data: parsed.activities.map((activity) => ({ ...activity, sectionId: id })),
        });
      }
      return tx.aboutSection.findUnique({
        where: { id: updated.id },
        include: sectionInclude,
      });
    });
    res.json(section);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Failed to update section";
    res.status(400).json({ error: message });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const id = paramId(req);
    if (!id) return res.status(400).json({ error: "Section id is required" });
    const existing = await prisma.aboutSection.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Section not found" });
    await prisma.aboutSection.delete({ where: { id } });
    res.json({ success: true, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete section" });
  }
};

export const createAssociate = async (req: Request, res: Response) => {
  try {
    await ensureAboutContent(prisma);
    const parsed = parseSectionInput({ ...req.body, type: SECTION_TYPES.ASSOCIATE }, 0);
    const last = await prisma.aboutSection.findFirst({
      where: { pageId: ABOUT_PAGE_ID },
      orderBy: { displayOrder: "desc" },
    });
    const associate = await prisma.aboutSection.create({
      data: {
        pageId: ABOUT_PAGE_ID,
        type: SECTION_TYPES.ASSOCIATE,
        label: parsed.label || "Associate",
        title: parsed.title,
        imageUrl: parsed.imageUrl,
        imageAlt: parsed.imageAlt || parsed.title,
        designation: parsed.designation,
        qualifications: parsed.qualifications,
        introduction: parsed.introduction,
        experience: parsed.experience,
        visible: parsed.visible,
        active: parsed.active,
        displayOrder: last ? last.displayOrder + 1 : 0,
        blocks: { create: parsed.blocks },
        activities: { create: parsed.activities },
      },
      include: sectionInclude,
    });
    res.status(201).json(associate);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Failed to create associate";
    res.status(400).json({ error: message });
  }
};

export const updateAssociate = async (req: Request, res: Response) => {
  try {
    const id = paramId(req);
    if (!id) return res.status(400).json({ error: "Associate id is required" });
    const existing = await prisma.aboutSection.findUnique({ where: { id } });
    if (!existing || existing.type !== SECTION_TYPES.ASSOCIATE) {
      return res.status(404).json({ error: "Associate not found" });
    }
    req.body = { ...req.body, type: SECTION_TYPES.ASSOCIATE };
    return updateSection(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update associate" });
  }
};

export const deleteAssociate = async (req: Request, res: Response) => {
  try {
    const id = paramId(req);
    if (!id) return res.status(400).json({ error: "Associate id is required" });
    const existing = await prisma.aboutSection.findUnique({ where: { id } });
    if (!existing || existing.type !== SECTION_TYPES.ASSOCIATE) {
      return res.status(404).json({ error: "Associate not found" });
    }
    await prisma.aboutSection.delete({ where: { id } });
    res.json({ success: true, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete associate" });
  }
};

export const reorderAbout = async (req: Request, res: Response) => {
  try {
    const ids = req.body?.ids;
    if (!Array.isArray(ids) || ids.some((id: unknown) => typeof id !== "string")) {
      return res.status(400).json({ error: "ids must be an array of section ids" });
    }
    await prisma.$transaction(
      ids.map((id: string, index: number) =>
        prisma.aboutSection.update({
          where: { id },
          data: { displayOrder: index },
        })
      )
    );
    const page = await loadAboutPage(false);
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reorder About Us content" });
  }
};

export const updateVisibility = async (req: Request, res: Response) => {
  try {
    const id = paramId(req);
    if (!id) return res.status(400).json({ error: "Section id is required" });
    const visible = asBoolean(req.body?.visible, true);
    const active = req.body?.active === undefined ? undefined : asBoolean(req.body.active, true);
    const section = await prisma.aboutSection.update({
      where: { id },
      data: active === undefined ? { visible } : { visible, active },
      include: sectionInclude,
    });
    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update visibility" });
  }
};
