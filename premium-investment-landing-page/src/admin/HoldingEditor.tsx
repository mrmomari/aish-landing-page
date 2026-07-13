import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { uploadImage } from "../lib/content";
import type { Holding } from "../lib/types";
import { ImageUpload } from "./ImageUpload";

const STAGES = ["Active", "In development", "Future project"];

function emptyHolding(sortOrder: number): Holding {
  return {
    id: crypto.randomUUID(),
    name: "",
    short_code: "",
    sector: "",
    stage: "Active",
    headline: "",
    description: "",
    website_url: "",
    contact_email: "",
    contact_phone: "",
    logo_url: null,
    accent_color: "#d8b36a",
    focus_tags: [],
    sort_order: sortOrder,
    visible: true,
    photos: [],
  };
}

export function HoldingEditor({
  holding,
  nextSortOrder,
  onClose,
  onSave,
}: {
  holding: Holding | null;
  nextSortOrder: number;
  onClose: () => void;
  onSave: (holding: Holding) => void;
}) {
  const [form, setForm] = useState<Holding>(holding ?? emptyHolding(nextSortOrder));
  const [focusTagsInput, setFocusTagsInput] = useState((holding?.focus_tags ?? []).join(", "));
  const [error, setError] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);

  const update = <K extends keyof Holding>(key: K, value: Holding[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError("Company name is required.");
      return;
    }
    onSave({
      ...form,
      focus_tags: focusTagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  const handleAddPhoto = async (file: File | undefined) => {
    if (!file) return;
    setPhotoUploading(true);
    try {
      const url = await uploadImage(file, `holdings/${form.id}`);
      update("photos", [...form.photos, url]);
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleRemovePhoto = (url: string) => {
    update(
      "photos",
      form.photos.filter((p) => p !== url)
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10">
      <div className="w-full max-w-2xl rounded-lg border border-white/10 bg-[#12171a] p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-white">{holding ? "Edit holding" : "Add holding"}</h3>
          <button type="button" onClick={onClose} className="text-white/50 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-wide text-white/50">Logo</p>
          <ImageUpload
            folder="holdings"
            currentUrl={form.logo_url}
            onUploaded={(url) => update("logo_url", url)}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Company name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Short code (badge)</label>
            <input
              maxLength={3}
              value={form.short_code}
              onChange={(e) => update("short_code", e.target.value.toUpperCase())}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Sector</label>
            <input
              value={form.sector}
              onChange={(e) => update("sector", e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Stage</label>
            <select
              value={form.stage}
              onChange={(e) => update("stage", e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            >
              {STAGES.map((stage) => (
                <option key={stage} value={stage} className="bg-[#12171a]">
                  {stage}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-white/50">Headline</label>
            <input
              value={form.headline}
              onChange={(e) => update("headline", e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-white/50">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-white/50">Focus areas (comma separated)</label>
            <input
              value={focusTagsInput}
              onChange={(e) => setFocusTagsInput(e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Website</label>
            <input
              value={form.website_url}
              onChange={(e) => update("website_url", e.target.value)}
              placeholder="https://"
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Accent color</label>
            <input
              type="color"
              value={form.accent_color}
              onChange={(e) => update("accent_color", e.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-white/20 bg-white/5 px-2"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Contact email</label>
            <input
              value={form.contact_email}
              onChange={(e) => update("contact_email", e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50">Contact phone</label>
            <input
              value={form.contact_phone}
              onChange={(e) => update("contact_phone", e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
          <label className="flex items-center gap-3 text-sm text-white/80 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.visible}
              onChange={(e) => update("visible", e.target.checked)}
              className="h-4 w-4"
            />
            Visible on the live site
          </label>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-wide text-white/50">Additional photos</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {form.photos.map((url) => (
              <div key={url} className="group relative h-20 w-20 overflow-hidden rounded-md border border-white/15">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(url)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
            <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border border-dashed border-white/25 text-xs text-white/50 hover:border-[#d6b878] hover:text-[#d6b878]">
              {photoUploading ? "…" : "+ Add"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleAddPhoto(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/20 px-5 py-3 text-sm text-white/70 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-[#d6b878] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#111518] hover:opacity-90"
          >
            Save holding
          </button>
        </div>
      </div>
    </div>
  );
}
