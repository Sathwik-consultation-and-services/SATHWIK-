import prisma from "../lib/prisma.js";
import { ensureAboutContent } from "./seedAbout.js";

await ensureAboutContent(prisma);
console.log("About Us content is present (idempotent seed).");
await prisma.$disconnect();
