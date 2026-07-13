import type { CompanyInfo } from "../lib/types";
import { ImageUpload } from "./ImageUpload";

const FIELDS: { key: keyof CompanyInfo; label: string; span?: boolean }[] = [
  { key: "legal_name", label: "Legal company name", span: true },
  { key: "display_name", label: "Display name" },
  { key: "registration_number", label: "Registration / license number" },
  { key: "tagline", label: "Tagline", span: true },
  { key: "address_line1", label: "Address line 1", span: true },
  { key: "address_line2", label: "Address line 2", span: true },
  { key: "city", label: "City" },
  { key: "state", label: "State / Province" },
  { key: "postal_code", label: "Postal code" },
  { key: "country", label: "Country" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website" },
];

export function CompanyInfoForm({
  info,
  onChange,
}: {
  info: CompanyInfo;
  onChange: (info: CompanyInfo) => void;
}) {
  const update = (key: keyof CompanyInfo, value: string) => {
    onChange({ ...info, [key]: value });
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-medium tracking-[-0.02em] text-white">Company information</h2>
      <p className="mt-2 text-sm text-white/50">
        This appears prominently on the landing page and in the footer. Click "Publish changes" above when
        you're done editing.
      </p>

      <div className="mt-6">
        <p className="mb-2 text-xs uppercase tracking-wide text-white/50">Company logo</p>
        <ImageUpload
          folder="company"
          currentUrl={info.logo_url}
          onUploaded={(url) => update("logo_url", url)}
          label="Upload logo"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key} className={field.span ? "sm:col-span-2" : ""}>
            <label className="text-xs uppercase tracking-wide text-white/50">{field.label}</label>
            <input
              value={(info[field.key] as string) ?? ""}
              onChange={(e) => update(field.key, e.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wide text-white/50">Description</label>
          <textarea
            value={info.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b878]"
          />
        </div>
      </div>
    </div>
  );
}
