import { useState } from "react";
import { ADMIN_EMAIL } from "../lib/supabase";
import { signIn, signUpAdmin } from "../lib/auth";

export function AdminLogin() {
  const [mode, setMode] = useState<"login" | "setup">("login");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(ADMIN_EMAIL, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await signUpAdmin(password);
      setNotice(
        `Account created. Check ${ADMIN_EMAIL} for a confirmation email, then come back and sign in.`
      );
      setMode("login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f12] px-5 text-white">
      <div className="w-full max-w-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c6a562]">AISH Admin</p>
        <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">
          {mode === "login" ? "Sign in" : "Create admin account"}
        </h1>
        <p className="mt-2 text-sm text-white/50">
          {mode === "login"
            ? `Sign in as ${ADMIN_EMAIL} to manage site content.`
            : `This creates the one admin account for ${ADMIN_EMAIL}.`}
        </p>

        {notice && (
          <p className="mt-5 rounded-md border border-[#3d5a3f] bg-[#16241a] px-4 py-3 text-sm text-[#a9d8b1]">
            {notice}
          </p>
        )}

        <form onSubmit={mode === "login" ? handleLogin : handleSetup} className="mt-8 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#d6b878]"
            />
          </div>
          {mode === "setup" && (
            <div>
              <label className="text-xs uppercase tracking-wide text-white/50">Confirm password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#d6b878]"
              />
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-[#d6b878] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#111518] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "setup" : "login");
            setError("");
            setNotice("");
          }}
          className="mt-6 text-xs text-white/40 underline-offset-4 hover:text-white/70 hover:underline"
        >
          {mode === "login" ? "First time here? Create the admin account" : "Back to sign in"}
        </button>
      </div>
    </div>
  );
}
