import type { PrismaClient } from "../generated/prisma/client.js";
import { ABOUT_PAGE_ID, defaultAboutContent } from "./defaultContent.js";

export async function ensureAboutContent(prisma: PrismaClient) {
  const existing = await prisma.aboutPage.findUnique({
    where: { id: ABOUT_PAGE_ID },
    include: { sections: { select: { id: true } } },
  });

  if (existing && existing.sections.length > 0) {
    return existing;
  }

  if (!existing) {
    await prisma.aboutPage.create({
      data: {
        id: defaultAboutContent.id,
        heading: defaultAboutContent.heading,
        subtitle: defaultAboutContent.subtitle,
      },
    });
  }

  for (const section of defaultAboutContent.sections) {
    const already = await prisma.aboutSection.findUnique({ where: { id: section.id } });
    if (already) continue;

    await prisma.aboutSection.create({
      data: {
        id: section.id,
        pageId: ABOUT_PAGE_ID,
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
        displayOrder: section.displayOrder,
        blocks: {
          create: section.blocks.map((block, index) => ({
            kind: block.kind,
            text: block.text,
            displayOrder: index,
          })),
        },
        activities: {
          create: section.activities.map((text, index) => ({
            text,
            displayOrder: index,
          })),
        },
      },
    });
  }

  return prisma.aboutPage.findUnique({ where: { id: ABOUT_PAGE_ID } });
}
