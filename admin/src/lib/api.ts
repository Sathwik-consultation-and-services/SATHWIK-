import type { Item, Resource } from "./types";

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

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Image upload failed");
  return data.url as string;
}
