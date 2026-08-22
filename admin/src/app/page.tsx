"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listItems } from "@/lib/api";
import type { Item } from "@/lib/types";

export default function DashboardPage() {
  const [products, setProducts] = useState<Item[] | null>(null);
  const [services, setServices] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const results = await Promise.allSettled([listItems("products"), listItems("services")]);
      if (results[0].status === "fulfilled") setProducts(results[0].value);
      if (results[1].status === "fulfilled") setServices(results[1].value);
      const firstError = results.find((r) => r.status === "rejected") as PromiseRejectedResult | undefined;
      if (firstError) setError(firstError.reason instanceof Error ? firstError.reason.message : "Backend unreachable");
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your products and services</p>
      </header>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not reach the backend: {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <StatCard href="/products" title="Products" count={products} />
        <StatCard href="/services" title="Services" count={services} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <RecentCard title="Recent products" items={products} />
        <RecentCard title="Recent services" items={services} />
      </div>
    </div>
  );
}

function StatCard({ href, title, count }: { href: string; title: string; count: Item[] | null }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-4xl font-bold">{count === null ? "-" : count.length}</p>
      <p className="mt-4 text-sm font-medium text-emerald-600">Manage &rarr;</p>
    </Link>
  );
}

function RecentCard({ title, items }: { title: string; items: Item[] | null }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-500">{title}</h2>
      {!items ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400">Nothing here yet.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {items.slice(0, 4).map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-9 w-9 rounded-md object-cover" />
              <span className="truncate text-sm">{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
