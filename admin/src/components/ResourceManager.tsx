"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { addItem, deleteItem, editItem, listItems } from "@/lib/api";
import type { Item, Resource } from "@/lib/types";

interface Props {
  resource: Resource;
  title: string;
  subtitle: string;
}

const emptyForm = { name: "", image: "", description: "" };

export default function ResourceManager({ resource, title, subtitle }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [toDelete, setToDelete] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listItems(resource);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormError(null);
    setModalOpen(true);
  }

  function openEdit(item: Item) {
    setEditing(item);
    setForm({ name: item.name, image: item.image, description: item.description });
    setFormError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim() || !form.description.trim()) {
      setFormError("Name, image and description are all required.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const body = { name: form.name.trim(), image: form.image.trim(), description: form.description.trim() };
      if (editing) {
        await editItem(resource, editing.id, body);
      } else {
        await addItem(resource, body);
      }
      setModalOpen(false);
      await refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteItem(resource, toDelete.id);
      setToDelete(null);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
        >
          + Add {title.slice(0, -1)}
        </button>
      </header>

      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={refresh} className="font-medium underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">No {resource} yet.</p>
          <button onClick={openCreate} className="mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            Add the first one
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="h-40 w-full bg-gray-100 object-cover" />
              <div className="space-y-2 p-4">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="line-clamp-3 text-sm text-gray-500">{item.description}</p>
                <p className="truncate text-xs text-gray-400">ID: {item.id}</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setToDelete(item)}
                    disabled={deleting}
                    className="flex-1 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setModalOpen(false)}>
          <div
            className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold">{editing ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={`${title.slice(0, -1)} name`}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
              </div>

              <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe it..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
              </div>

              {formError && <p className="text-xs font-medium text-red-500">{formError}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  {saving ? "Saving..." : editing ? "Save changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setToDelete(null)}>
          <div className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold">Delete &ldquo;{toDelete.name}&rdquo;?</h2>
            <p className="text-sm text-gray-500">
              This will permanently remove this {title.slice(0, -1).toLowerCase()} from the database. This cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setToDelete(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
