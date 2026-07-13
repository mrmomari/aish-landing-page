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
  // The admin panel holds the full site state, so its publish should always
  // win: re-fetch the file's current sha instead of trusting the one from
  // page load, which goes stale whenever another tab or device publishes.
  let sha = cachedSha;
  try {
    ({ sha } = await getFile(CONTENT_PATH));
  } catch {
    // keep the cached sha; the put below will surface any real error
  }
  const { sha: newSha } = await putFile(
    CONTENT_PATH,
    JSON.stringify(content, null, 2) + "\n",
    "Update site content via admin panel",
    sha ?? undefined
  );
  cachedSha = newSha;
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
