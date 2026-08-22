import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE_MB = 10;
const FOLDER = "sathwik-admin";

export async function POST(req: NextRequest) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Fill in CLOUDINARY_* values in admin/.env.local." },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type. Use JPEG, PNG, WebP, GIF or AVIF." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: `File too large (max ${MAX_SIZE_MB}MB)` }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  // Cloudinary requires signature params sorted alphabetically
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${FOLDER}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const upstream = new FormData();
  upstream.append("file", file, file.name);
  upstream.append("api_key", apiKey);
  upstream.append("timestamp", String(timestamp));
  upstream.append("folder", FOLDER);
  upstream.append("signature", signature);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: upstream,
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data?.error?.message ?? "Upload failed" }, { status: 502 });
    }
    return NextResponse.json({
      url: data.secure_url,
      publicId: data.public_id,
      bytes: data.bytes,
      width: data.width,
      height: data.height,
    });
  } catch {
    return NextResponse.json({ error: "Failed to reach Cloudinary" }, { status: 502 });
  }
}
