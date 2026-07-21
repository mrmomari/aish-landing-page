import { useState } from "react";
import { REPO_NAME, REPO_OWNER, setToken, verifyToken } from "../lib/github";

export function AdminLogin({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [tokenInput, setTokenInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await verifyToken(tokenInput.trim());
      setToken(tokenInput.trim());
      onAuthenticated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify token");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-5 py-10 text-[#1d1d1f]">
      <div className="w-full max-w-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071e3]">AISH Admin</p>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-[-0.02em]">Connect to GitHub</h1>
        <p className="mt-2 text-sm leading-6 text-[#6e6e73]">
          Paste a GitHub personal access token with write access to{" "}
          <span className="font-medium text-[#1d1d1f]">
            {REPO_OWNER}/{REPO_NAME}
          </span>
          . Changes you publish here are committed straight to that repository.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-[18px] border border-[#d2d2d7] bg-white p-6 sm:p-7"
        >
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-[#6e6e73]">
              Personal access token (fine-grained, Contents: read &amp; write)
            </label>
            <input
              type="password"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="github_pat_..."
              className="mt-2 w-full rounded-[10px] border border-[#d2d2d7] bg-white px-4 py-3 text-sm text-[#1d1d1f] outline-none focus:border-[#0071e3]"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="btn-capsule btn-primary w-full px-4 py-3 text-sm font-medium disabled:opacity-50"
          >
            {busy ? "Verifying…" : "Connect"}
          </button>
        </form>

        <p className="mt-6 text-xs leading-5 text-[#86868b]">
          Create one at github.com → Settings → Developer settings → Fine-grained tokens. Scope it to only
          this repository, with Contents permission set to Read and write. The token stays in this browser
          only and is used to call the GitHub API directly.
        </p>
      </div>
    </div>
  );
}
