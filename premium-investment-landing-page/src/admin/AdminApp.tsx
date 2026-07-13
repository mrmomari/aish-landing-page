import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSession, isAdminSession, onAuthChange } from "../lib/auth";
import { ADMIN_EMAIL } from "../lib/supabase";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });
    return onAuthChange(setSession);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f12] text-white/50">
        Loading…
      </div>
    );
  }

  if (!session) return <AdminLogin />;

  if (!isAdminSession(session)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f12] px-6 text-center text-white">
        <div>
          <h1 className="text-2xl font-medium">Not authorized</h1>
          <p className="mt-3 max-w-sm text-sm text-white/50">
            Signed in as {session.user.email}, but this admin panel is restricted to {ADMIN_EMAIL}.
          </p>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
