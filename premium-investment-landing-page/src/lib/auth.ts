import type { Session } from "@supabase/supabase-js";
import { ADMIN_EMAIL, supabase } from "./supabase";

export function isAdminSession(session: Session | null): boolean {
  return !!session?.user?.email && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(callback: (session: Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpAdmin(password: string) {
  const { error } = await supabase.auth.signUp({ email: ADMIN_EMAIL, password });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}
