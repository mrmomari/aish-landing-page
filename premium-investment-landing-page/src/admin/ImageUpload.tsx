import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadImage } from "../lib/content";

export function ImageUpload({
  folder,
  currentUrl,
  onUploaded,
  label = "Upload image",
}: {
  folder: string;
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-4">
      {currentUrl ? (
        <img src={currentUrl} alt="" className="h-16 w-16 rounded-[10px] border border-[#d2d2d7] object-cover" />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-[10px] border border-dashed border-[#d2d2d7] text-[#86868b]">
          <UploadCloud className="h-5 w-5" />
        </div>
      )}
      <div>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="btn-capsule btn-outline-dark px-4 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-50"
        >
          {uploading ? "Uploading…" : label}
        </button>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
