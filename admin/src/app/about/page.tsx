"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import {
  createAboutSection,
  createAssociate,
  deleteAboutSection,
  deleteAssociate,
  getAboutAdmin,
  reorderAbout,
  updateAboutPage,
  updateAboutVisibility,
} from "@/lib/api";
import type { AboutBlock, AboutPage, AboutSection } from "@/lib/types";

const emptyAssociate = (): AboutSection => ({
  id: `new-${crypto.randomUUID()}`,
  type: "ASSOCIATE",
  label: "Associate",
  title: "",
  imageUrl: "",
  imageAlt: "",
  designation: "",
  qualifications: "",
  introduction: "",
  experience: "",
  visible: true,
  active: true,
  displayOrder: 0,
  blocks: [{ kind: "paragraph", text: "" }],
  activities: [],
});

const emptyCustomSection = (): AboutSection => ({
  id: `new-${crypto.randomUUID()}`,
  type: "CUSTOM",
  label: "Section",
  title: "",
  imageUrl: "",
  imageAlt: "",
  designation: "",
  qualifications: "",
  introduction: "",
  experience: "",
  visible: true,
  active: true,
  displayOrder: 0,
  blocks: [{ kind: "paragraph", text: "" }],
  activities: [],
});

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none";
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {multiline ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={`${className} resize-y`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={className} />
      )}
    </div>
  );
}

function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: AboutBlock[];
  onChange: (blocks: AboutBlock[]) => void;
}) {
  function update(index: number, patch: Partial<AboutBlock>) {
    onChange(blocks.map((block, i) => (i === index ? { ...block, ...patch } : block)));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-700">Content blocks</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange([...blocks, { kind: "paragraph", text: "" }])}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium hover:bg-gray-50"
          >
            + Paragraph
          </button>
          <button
            type="button"
            onClick={() => onChange([...blocks, { kind: "heading", text: "" }])}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium hover:bg-gray-50"
          >
            + Heading
          </button>
          <button
            type="button"
            onClick={() => onChange([...blocks, { kind: "activities", text: "" }])}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium hover:bg-gray-50"
          >
            + Activities list
          </button>
        </div>
      </div>
      {blocks.map((block, index) => (
        <div key={`${block.kind}-${index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{block.kind}</span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => {
                  const next = [...blocks];
                  const current = next[index];
                  const previous = next[index - 1];
                  if (!current || !previous) return;
                  next[index - 1] = current;
                  next[index] = previous;
                  onChange(next);
                }}
                className="rounded border border-gray-300 px-2 py-0.5 text-xs disabled:opacity-40"
              >
                Up
              </button>
              <button
                type="button"
                disabled={index === blocks.length - 1}
                onClick={() => {
                  const next = [...blocks];
                  const current = next[index];
                  const following = next[index + 1];
                  if (!current || !following) return;
                  next[index + 1] = current;
                  next[index] = following;
                  onChange(next);
                }}
                className="rounded border border-gray-300 px-2 py-0.5 text-xs disabled:opacity-40"
              >
                Down
              </button>
              <button
                type="button"
                onClick={() => onChange(blocks.filter((_, i) => i !== index))}
                className="rounded border border-red-200 px-2 py-0.5 text-xs text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
          {block.kind === "activities" ? (
            <p className="text-xs text-gray-500">This block renders the principal activities list below.</p>
          ) : (
            <textarea
              rows={block.kind === "heading" ? 2 : 4}
              value={block.text}
              onChange={(e) => update(index, { text: e.target.value })}
              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ActivitiesEditor({
  activities,
  onChange,
}: {
  activities: AboutSection["activities"];
  onChange: (activities: AboutSection["activities"]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">Principal activities</p>
        <button
          type="button"
          onClick={() => onChange([...activities, { text: "" }])}
          className="text-xs font-semibold text-emerald-600"
        >
          + Add activity
        </button>
      </div>
      {activities.map((activity, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={activity.text}
            onChange={(e) =>
              onChange(activities.map((item, i) => (i === index ? { ...item, text: e.target.value } : item)))
            }
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => onChange(activities.filter((_, i) => i !== index))}
            className="rounded-md border border-red-200 px-2 text-xs text-red-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function SectionEditor({
  section,
  onChange,
  onDelete,
}: {
  section: AboutSection;
  onChange: (section: AboutSection) => void;
  onDelete?: () => void;
}) {
  const title =
    section.type === "COMPANY_PROFILE"
      ? "Company Profile"
      : section.type === "OUR_PROFILE"
        ? "Our Profile"
        : section.type === "ASSOCIATE"
          ? "Associate"
          : "Custom section";

  return (
    <article className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-xs text-gray-400">Display order {section.displayOrder + 1}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={section.visible}
              onChange={(e) => onChange({ ...section, visible: e.target.checked })}
            />
            Visible
          </label>
          {section.type === "ASSOCIATE" && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={section.active}
                onChange={(e) => onChange({ ...section, active: e.target.checked })}
              />
              Active
            </label>
          )}
          {onDelete && (
            <button type="button" onClick={onDelete} className="font-semibold text-red-600">
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Section label" value={section.label} onChange={(label) => onChange({ ...section, label })} />
        <Field
          label={section.type === "COMPANY_PROFILE" ? "Company name" : "Name"}
          value={section.title}
          onChange={(title) => onChange({ ...section, title })}
        />
        {(section.type === "ASSOCIATE" || section.type === "CUSTOM") && (
          <Field
            label="Designation"
            value={section.designation}
            onChange={(designation) => onChange({ ...section, designation })}
          />
        )}
        <Field label="Image alt text" value={section.imageAlt} onChange={(imageAlt) => onChange({ ...section, imageAlt })} />
      </div>

      <ImageUpload
        label={
          section.type === "COMPANY_PROFILE"
            ? "Company logo / image"
            : section.type === "ASSOCIATE"
              ? "Profile photograph"
              : "Photograph"
        }
        value={section.imageUrl}
        onChange={(imageUrl) => onChange({ ...section, imageUrl })}
      />

      {section.type === "ASSOCIATE" && (
        <div className="grid gap-4">
          <Field
            label="Qualifications"
            multiline
            value={section.qualifications}
            onChange={(qualifications) => onChange({ ...section, qualifications })}
          />
          <Field
            label="Professional introduction"
            multiline
            value={section.introduction}
            onChange={(introduction) => onChange({ ...section, introduction })}
          />
          <Field
            label="Experience"
            multiline
            value={section.experience}
            onChange={(experience) => onChange({ ...section, experience })}
          />
        </div>
      )}

      {section.type === "OUR_PROFILE" && (
        <div className="grid gap-4">
          <Field
            label="Professional introduction"
            multiline
            value={section.introduction}
            onChange={(introduction) => onChange({ ...section, introduction })}
          />
          <Field
            label="Experience and background"
            multiline
            value={section.experience}
            onChange={(experience) => onChange({ ...section, experience })}
          />
        </div>
      )}

      <BlockEditor blocks={section.blocks} onChange={(blocks) => onChange({ ...section, blocks })} />
      {(section.type === "OUR_PROFILE" || section.activities.length > 0 || section.blocks.some((b) => b.kind === "activities")) && (
        <ActivitiesEditor
          activities={section.activities}
          onChange={(activities) => onChange({ ...section, activities })}
        />
      )}
    </article>
  );
}

export default function AboutAdminPage() {
  const [page, setPage] = useState<AboutPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAboutAdmin();
      setPage(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load About Us");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const orderedSections = useMemo(
    () => [...(page?.sections ?? [])].sort((a, b) => a.displayOrder - b.displayOrder),
    [page]
  );

  function updateSection(id: string, next: AboutSection) {
    if (!page) return;
    setPage({
      ...page,
      sections: page.sections.map((section) => (section.id === id ? next : section)),
    });
  }

  function moveSection(id: string, direction: -1 | 1) {
    if (!page) return;
    const sections = [...orderedSections];
    const index = sections.findIndex((section) => section.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= sections.length) return;
    const current = sections[index];
    const swapWith = sections[target];
    if (!current || !swapWith) return;
    sections[index] = swapWith;
    sections[target] = current;
    setPage({
      ...page,
      sections: sections.map((section, displayOrder) => ({ ...section, displayOrder })),
    });
  }

  async function persistReorder(sections: AboutSection[]) {
    const persistedIds = sections.filter((section) => !section.id.startsWith("new-")).map((section) => section.id);
    if (persistedIds.length > 0) {
      await reorderAbout(persistedIds);
    }
  }

  async function handleSave() {
    if (!page) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const payload = {
        heading: page.heading,
        subtitle: page.subtitle,
        sections: orderedSections.map((section, index) => ({
          ...section,
          ...(section.id.startsWith("new-") ? { id: undefined } : { id: section.id }),
          displayOrder: index,
        })),
      };
      const saved = await updateAboutPage(payload as { heading: string; subtitle: string; sections: AboutSection[] });
      setPage(saved);
      setNotice("About Us content saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function addAssociate() {
    if (!page) return;
    const draft = emptyAssociate();
    try {
      const created = await createAssociate({
        ...draft,
        title: "New Associate",
        label: "Associate",
      });
      setPage({ ...page, sections: [...page.sections, created] });
    } catch {
      setPage({
        ...page,
        sections: [...page.sections, { ...draft, title: "New Associate", displayOrder: page.sections.length }],
      });
    }
  }

  async function addCustomSection() {
    if (!page) return;
    const draft = emptyCustomSection();
    try {
      const created = await createAboutSection({
        ...draft,
        title: "New section",
        label: "Section",
      });
      setPage({ ...page, sections: [...page.sections, created] });
    } catch {
      setPage({
        ...page,
        sections: [...page.sections, { ...draft, title: "New section", displayOrder: page.sections.length }],
      });
    }
  }

  async function removeSection(section: AboutSection) {
    if (!page) return;
    const confirmed = window.confirm(`Delete “${section.title || section.label}”? This cannot be undone after save.`);
    if (!confirmed) return;
    if (!section.id.startsWith("new-")) {
      try {
        if (section.type === "ASSOCIATE") {
          await deleteAssociate(section.id);
        } else {
          await deleteAboutSection(section.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed");
        return;
      }
    }
    setPage({
      ...page,
      sections: page.sections
        .filter((item) => item.id !== section.id)
        .map((item, displayOrder) => ({ ...item, displayOrder })),
    });
  }

  async function persistVisibility(section: AboutSection, visible: boolean, active = section.active) {
    updateSection(section.id, { ...section, visible, active });
    if (!section.id.startsWith("new-")) {
      try {
        await updateAboutVisibility(section.id, { visible, active });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Visibility update failed");
      }
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">About Us</h1>
          <p className="text-sm text-gray-500">Edit the public About Us page without changing its existing design.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void addCustomSection()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            + Section
          </button>
          <button
            type="button"
            onClick={() => void addAssociate()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            + Associate
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving || !page}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </header>

      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => void refresh()} className="font-medium underline">
            Retry
          </button>
        </div>
      )}
      {notice && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</div>}

      {loading || !page ? (
        <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
      ) : (
        <>
          <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <h2 className="text-lg font-bold">Page settings</h2>
            <Field label="Main page heading" value={page.heading} onChange={(heading) => setPage({ ...page, heading })} />
            <Field label="Page subtitle" value={page.subtitle} onChange={(subtitle) => setPage({ ...page, subtitle })} />
          </section>

          <section className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <h2 className="text-lg font-bold">Section order and visibility</h2>
            <ul className="divide-y divide-gray-100">
              {orderedSections.map((section, index) => (
                <li key={section.id} className="flex flex-wrap items-center gap-3 py-3">
                  <span className="w-8 text-sm text-gray-400">{index + 1}</span>
                  <span className="min-w-0 flex-1 text-sm font-medium">
                    {section.label}: {section.title}
                  </span>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={section.visible}
                      onChange={(e) => void persistVisibility(section, e.target.checked)}
                    />
                    Visible
                  </label>
                  {section.type === "ASSOCIATE" && (
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={section.active}
                        onChange={(e) => void persistVisibility(section, section.visible, e.target.checked)}
                      />
                      Active
                    </label>
                  )}
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => {
                      moveSection(section.id, -1);
                    }}
                    className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    disabled={index === orderedSections.length - 1}
                    onClick={() => {
                      moveSection(section.id, 1);
                    }}
                    className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40"
                  >
                    Down
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => void persistReorder(orderedSections)}
              className="text-sm font-semibold text-emerald-600"
            >
              Save order now
            </button>
          </section>

          {orderedSections.map((section) => (
            <SectionEditor
              key={section.id}
              section={section}
              onChange={(next) => updateSection(section.id, next)}
              onDelete={
                section.type === "ASSOCIATE" || section.type === "CUSTOM"
                  ? () => void removeSection(section)
                  : undefined
              }
            />
          ))}
        </>
      )}
    </div>
  );
}
