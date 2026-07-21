import { useState } from "react";
import { Building2, ExternalLink, LayoutList, LogOut, Store } from "lucide-react";
import type { SiteContent } from "../lib/types";
import { CompanyInfoForm } from "./CompanyInfoForm";
import { HoldingsManager } from "./HoldingsManager";
import { SectionsManager } from "./SectionsManager";

const TABS = [
  { key: "company", label: "Company info", icon: Building2 },
  { key: "holdings", label: "Holdings", icon: Store },
  { key: "sections", label: "Page sections", icon: LayoutList },
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
      setStatus("Published. Live site updates in about a minute.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  const navButton = (item: (typeof TABS)[number], compact = false) => {
    const Icon = item.icon;
    const active = tab === item.key;
    return (
      <button
        key={item.key}
        type="button"
        onClick={() => setTab(item.key)}
        className={`flex items-center gap-2.5 rounded-[10px] text-sm transition-colors ${
          compact ? "shrink-0 px-3.5 py-2" : "w-full px-3 py-2.5 text-left"
        } ${
          active
            ? "bg-[#e8f0fe] font-semibold text-[#1d1d1f]"
            : "text-[#6e6e73] hover:bg-[#ececef] hover:text-[#1d1d1f]"
        }`}
      >
        <Icon className={`h-4 w-4 ${active ? "text-[#0071e3]" : "text-[#86868b]"}`} />
        {item.label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] lg:flex">
      <aside className="hidden border-r border-[#d2d2d7] bg-white px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-60 lg:shrink-0 lg:flex-col lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071e3]">AISH Admin</p>
          <p className="mt-1 text-xs text-[#86868b]">Content management</p>
          <nav className="mt-8 space-y-1">{TABS.map((item) => navButton(item))}</nav>
        </div>
        <div className="space-y-1 border-t border-[#d2d2d7] pt-4">
          <a
            href={import.meta.env.BASE_URL}
            className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm text-[#6e6e73] transition-colors hover:bg-[#ececef] hover:text-[#1d1d1f]"
          >
            <ExternalLink className="h-4 w-4 text-[#86868b]" /> View site
          </a>
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-sm text-[#6e6e73] transition-colors hover:bg-[#ececef] hover:text-[#1d1d1f]"
          >
            <LogOut className="h-4 w-4 text-[#86868b]" /> Disconnect
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 border-b border-[#d2d2d7] bg-[#f5f5f7]/95 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071e3] lg:hidden">
                AISH Admin
              </p>
              <h1 className="font-display hidden text-lg font-semibold tracking-[-0.01em] lg:block">
                {TABS.find((t) => t.key === tab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className={`flex items-center gap-2 text-xs ${dirty ? "text-[#0071e3]" : "text-[#86868b]"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${dirty ? "bg-[#0071e3]" : "bg-[#34c759]"}`} />
                {dirty ? "Unsaved changes" : "Everything published"}
              </span>
              <button
                type="button"
                onClick={handlePublish}
                disabled={!dirty || publishing}
                className="btn-capsule btn-primary px-5 py-2.5 text-sm font-medium disabled:cursor-default disabled:bg-[#d2d2d7] disabled:text-white"
              >
                {publishing ? "Publishing…" : "Publish"}
              </button>
              <a
                href={import.meta.env.BASE_URL}
                className="flex items-center gap-1.5 text-sm text-[#6e6e73] hover:text-[#1d1d1f] lg:hidden"
              >
                View site <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={onSignOut}
                className="flex items-center gap-1.5 text-sm text-[#6e6e73] hover:text-[#1d1d1f] lg:hidden"
                aria-label="Disconnect"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          {status && (
            <p className="border-t border-[#d2d2d7] bg-white px-5 py-2 text-xs text-[#6e6e73] sm:px-8">{status}</p>
          )}
          <nav className="flex gap-1 overflow-x-auto px-5 pb-3 sm:px-8 lg:hidden">
            {TABS.map((item) => navButton(item, true))}
          </nav>
        </header>

        <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="rounded-[18px] border border-[#d2d2d7] bg-white p-5 sm:p-8">
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
          </div>
        </main>
      </div>
    </div>
  );
}
