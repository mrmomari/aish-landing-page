import { MEDIA_BUCKET, supabase } from "./supabase";
import type { CompanyInfo, Holding, HoldingMedia, SectionSetting } from "./types";

export async function fetchCompanyInfo(): Promise<CompanyInfo | null> {
  const { data, error } = await supabase
    .from("aish_company_info")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveCompanyInfo(info: Partial<CompanyInfo>) {
  const { error } = await supabase
    .from("aish_company_info")
    .update({ ...info, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw error;
}

export async function fetchHoldings(onlyVisible = false): Promise<Holding[]> {
  let query = supabase.from("aish_holdings").select("*").order("sort_order", { ascending: true });
  if (onlyVisible) query = query.eq("visible", true);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createHolding(holding: Partial<Holding>) {
  const { data, error } = await supabase.from("aish_holdings").insert(holding).select().single();
  if (error) throw error;
  return data as Holding;
}

export async function updateHolding(id: string, holding: Partial<Holding>) {
  const { error } = await supabase
    .from("aish_holdings")
    .update({ ...holding, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteHolding(id: string) {
  const { error } = await supabase.from("aish_holdings").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchMedia(holdingId?: string | null): Promise<HoldingMedia[]> {
  let query = supabase.from("aish_media").select("*").order("sort_order", { ascending: true });
  query = holdingId ? query.eq("holding_id", holdingId) : query.is("holding_id", null);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function addMedia(media: Partial<HoldingMedia>) {
  const { data, error } = await supabase.from("aish_media").insert(media).select().single();
  if (error) throw error;
  return data as HoldingMedia;
}

export async function deleteMedia(id: string) {
  const { error } = await supabase.from("aish_media").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchSections(): Promise<SectionSetting[]> {
  const { data, error } = await supabase
    .from("aish_sections")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function setSectionVisible(sectionKey: string, visible: boolean) {
  const { error } = await supabase
    .from("aish_sections")
    .update({ visible })
    .eq("section_key", sectionKey);
  if (error) throw error;
}

export async function uploadMediaFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
