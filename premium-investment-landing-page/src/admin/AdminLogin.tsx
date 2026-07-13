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
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f12] px-5 text-white">
      <div className="w-full max-w-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c6a562]">AISH Admin</p>
        <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">Connect to GitHub</h1>
        <p className="mt-2 text-sm text-white/50">
          Paste a GitHub personal access token with write access to{" "}
          <span className="text-white/80">
            {REPO_OWNER}/{REPO_NAME}
          </span>
          . Changes you publish here are committed straight to that repository.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">
              Personal access token (fine-grained, Contents: read & write)
            </label>
            <input
              type="password"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="github_pat_..."
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#d6b878]"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-[#d6b878] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#111518] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Verifying…" : "Connect"}
          </button>
        </form>

        <p className="mt-6 text-xs leading-5 text-white/35">
          Create one at github.com → Settings → Developer settings → Fine-grained tokens. Scope it to only
          this repository, with Contents permission set to Read and write. The token stays in this browser
          only and is used to call the GitHub API directly.
        </p>
      </div>
    </div>
  );
}
