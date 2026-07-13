import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadMediaFile } from "../lib/data";

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
      const url = await uploadMediaFile(file, folder);
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
        <img src={currentUrl} alt="" className="h-16 w-16 rounded-md border border-white/15 object-cover" />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-white/20 text-white/30">
          <UploadCloud className="h-5 w-5" />
        </div>
      )}
      <div>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-md border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors hover:border-[#d6b878] hover:text-[#d6b878] disabled:opacity-50"
        >
          {uploading ? "Uploading…" : label}
        </button>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
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
