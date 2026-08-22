"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/api";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Image (Cloudinary)</label>

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-16 w-16 rounded-md border border-gray-100 object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-emerald-600">{value}</p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-1 text-xs font-medium text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center ${
            dragOver ? "border-emerald-400 bg-emerald-50" : "border-gray-300 bg-white"
          }`}
        >
          {uploading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              <p className="text-sm text-gray-500">Uploading to Cloudinary...</p>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-gray-400">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700"
              >
                Choose image
              </button>
              <p className="text-xs text-gray-400">or drag &amp; drop (JPEG, PNG, WebP, GIF, AVIF - max 10MB)</p>
            </>
          )}
        </div>
      )}

      {!uploading && (
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      )}

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
