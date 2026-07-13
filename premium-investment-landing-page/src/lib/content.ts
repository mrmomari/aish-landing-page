import { CONTENT_PATH, fileToBase64, getFile, putBinaryFile, putFile } from "./github";
import type { SiteContent } from "./types";
import defaultContent from "../content.json";

let cachedSha: string | null = null;

export async function loadContent(): Promise<SiteContent> {
  const { content, sha } = await getFile(CONTENT_PATH);
  cachedSha = sha;
  return JSON.parse(content);
}

export async function publishContent(content: SiteContent): Promise<void> {
  const { sha } = await putFile(
    CONTENT_PATH,
    JSON.stringify(content, null, 2) + "\n",
    "Update site content via admin panel",
    cachedSha ?? undefined
  );
  cachedSha = sha;
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const base64 = await fileToBase64(file);
  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `premium-investment-landing-page/public/uploads/${folder}/${filename}`;
  const { downloadUrl } = await putBinaryFile(path, base64, `Upload image: ${folder}/${filename}`);
  return downloadUrl;
}

export function getBundledContent(): SiteContent {
  return defaultContent as SiteContent;
}
