export const REPO_OWNER = "mrmomari";
export const REPO_NAME = "aish-landing-page";
export const REPO_BRANCH = "master";
export const CONTENT_PATH = "premium-investment-landing-page/src/content.json";
export const SITE_BASE_PATH = "/aish-landing-page/";

const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const TOKEN_KEY = "aish_gh_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function githubFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `GitHub API error (${res.status})`);
  }
  return res.json();
}

export async function verifyToken(token: string): Promise<void> {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Invalid token or no access to the repository.");
  const data = await res.json();
  if (!data.permissions?.push) {
    throw new Error("This token doesn't have write access to the repository.");
  }
}

function utf8ToBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  const data = await githubFetch(`/contents/${path}?ref=${REPO_BRANCH}`);
  return { content: base64ToUtf8(data.content), sha: data.sha };
}

export async function putFile(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<{ sha: string }> {
  const data = await githubFetch(`/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: utf8ToBase64(content),
      branch: REPO_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  return { sha: data.content.sha };
}

export async function putBinaryFile(
  path: string,
  base64Content: string,
  message: string
): Promise<{ downloadUrl: string }> {
  await githubFetch(`/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: base64Content, branch: REPO_BRANCH }),
  });
  const relativePath = path.split("/").slice(2).join("/");
  return { downloadUrl: `${SITE_BASE_PATH}${relativePath}` };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
