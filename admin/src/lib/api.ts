import type { AboutPage, AboutSection, Item, Resource } from "./types";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
const API_URL = `${configuredApiUrl.replace(/\/+$/, "")}${configuredApiUrl.replace(/\/+$/, "").endsWith("/api") ? "" : "/api"}`;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store", ...init });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function listItems(resource: Resource): Promise<Item[]> {
  return request<Item[]>(`/${resource}/get`);
}

export async function addItem(resource: Resource, body: Omit<Item, "id">): Promise<Item> {
  return request<Item>(`/${resource}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function editItem(resource: Resource, id: string, body: Omit<Item, "id">): Promise<Item> {
  return request<Item>(`/${resource}/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteItem(resource: Resource, id: string): Promise<void> {
  await request<void>(`/${resource}/delete/${id}`, { method: "DELETE" });
}

export async function getAboutAdmin(): Promise<AboutPage> {
  return request<AboutPage>("/about/admin");
}

export async function updateAboutPage(body: {
  heading: string;
  subtitle: string;
  sections: AboutSection[];
}): Promise<AboutPage> {
  return request<AboutPage>("/about/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function createAboutSection(body: Partial<AboutSection>): Promise<AboutSection> {
  return request<AboutSection>("/about/sections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function updateAboutSection(id: string, body: Partial<AboutSection>): Promise<AboutSection> {
  return request<AboutSection>(`/about/sections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteAboutSection(id: string): Promise<void> {
  await request<void>(`/about/sections/${id}`, { method: "DELETE" });
}

export async function createAssociate(body: Partial<AboutSection>): Promise<AboutSection> {
  return request<AboutSection>("/about/associates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function updateAssociate(id: string, body: Partial<AboutSection>): Promise<AboutSection> {
  return request<AboutSection>(`/about/associates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteAssociate(id: string): Promise<void> {
  await request<void>(`/about/associates/${id}`, { method: "DELETE" });
}

export async function reorderAbout(ids: string[]): Promise<AboutPage> {
  return request<AboutPage>("/about/reorder", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

export async function updateAboutVisibility(
  id: string,
  body: { visible: boolean; active?: boolean }
): Promise<AboutSection> {
  return request<AboutSection>(`/about/sections/${id}/visibility`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Image upload failed");
  return data.url as string;
}
