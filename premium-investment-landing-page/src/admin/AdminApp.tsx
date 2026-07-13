import { useEffect, useState } from "react";
import { clearToken, getToken, verifyToken } from "../lib/github";
import { loadContent, publishContent } from "../lib/content";
import type { SiteContent } from "../lib/types";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loadError, setLoadError] = useState("");

  const init = async () => {
    setChecking(true);
    setLoadError("");
    const token = getToken();
    if (!token) {
      setAuthed(false);
      setChecking(false);
      return;
    }
    try {
      await verifyToken(token);
      setAuthed(true);
      const loaded = await loadContent();
      setContent(loaded);
    } catch (err) {
      clearToken();
      setAuthed(false);
      setLoadError(err instanceof Error ? err.message : "Failed to connect");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f2ec] text-[#8b887e]">
        Loading…
      </div>
    );
  }

  if (!authed || !content) {
    return (
      <>
        <AdminLogin onAuthenticated={init} />
        {loadError && (
          <p className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700 shadow-md">
            {loadError}
          </p>
        )}
      </>
    );
  }

  return (
    <AdminDashboard
      content={content}
      onChange={setContent}
      onPublish={async (next) => {
        await publishContent(next);
        setContent(next);
      }}
      onSignOut={() => {
        clearToken();
        setAuthed(false);
        setContent(null);
      }}
    />
  );
}
