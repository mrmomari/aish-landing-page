import { useState } from "react";
import { ExternalLink, LogOut } from "lucide-react";
import type { SiteContent } from "../lib/types";
import { CompanyInfoForm } from "./CompanyInfoForm";
import { HoldingsManager } from "./HoldingsManager";
import { SectionsManager } from "./SectionsManager";

const TABS = [
  { key: "company", label: "Company info" },
  { key: "holdings", label: "Holdings" },
  { key: "sections", label: "Page sections" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function AdminDashboard({
  content,
  onChange,
  onPublish,
  onSignOut,
}: {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
  onPublish: (content: SiteContent) => Promise<void>;
  onSignOut: () => void;
}) {
  const [tab, setTab] = useState<TabKey>("company");
  const [dirty, setDirty] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState("");

  const update = (next: SiteContent) => {
    onChange(next);
    setDirty(true);
    setStatus("");
  };

  const handlePublish = async () => {
    setPublishing(true);
    setStatus("");
    try {
      await onPublish(content);
      setDirty(false);
      setStatus("Published. Live site will update in about a minute as GitHub Pages rebuilds.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f12] text-white">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#0b0f12]/95 px-6 py-5 backdrop-blur sm:px-10">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#c6a562]">AISH Admin</p>
          <p className="text-sm text-white/50">Content management</p>
        </div>
        <div className="flex items-center gap-3">
          {status && <p className="max-w-xs text-xs text-white/50">{status}</p>}
          <a href="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
            View site <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={handlePublish}
            disabled={!dirty || publishing}
            className="rounded-md bg-[#d6b878] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#111518] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {publishing ? "Publishing…" : dirty ? "Publish changes" : "Published"}
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/70 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" /> Disconnect
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 lg:flex-row">
        <nav className="flex gap-2 lg:w-48 lg:flex-col">
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-md px-4 py-3 text-left text-sm font-medium transition-colors ${
                tab === item.key ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1">
          {tab === "company" && (
            <CompanyInfoForm
              info={content.companyInfo}
              onChange={(companyInfo) => update({ ...content, companyInfo })}
            />
          )}
          {tab === "holdings" && (
            <HoldingsManager
              holdings={content.holdings}
              onChange={(holdings) => update({ ...content, holdings })}
            />
          )}
          {tab === "sections" && (
            <SectionsManager
              sections={content.sections}
              onChange={(sections) => update({ ...content, sections })}
            />
          )}
        </main>
      </div>
    </div>
  );
}
