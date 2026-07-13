import { useState } from "react";
import { ExternalLink, LogOut } from "lucide-react";
import { signOut } from "../lib/auth";
import { CompanyInfoForm } from "./CompanyInfoForm";
import { HoldingsManager } from "./HoldingsManager";
import { SectionsManager } from "./SectionsManager";

const TABS = [
  { key: "company", label: "Company info" },
  { key: "holdings", label: "Holdings" },
  { key: "sections", label: "Page sections" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function AdminDashboard() {
  const [tab, setTab] = useState<TabKey>("company");

  return (
    <div className="min-h-screen bg-[#0b0f12] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-10">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#c6a562]">AISH Admin</p>
          <p className="text-sm text-white/50">Content management</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            View site <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => signOut()}
            className="flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/70 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
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
          {tab === "company" && <CompanyInfoForm />}
          {tab === "holdings" && <HoldingsManager />}
          {tab === "sections" && <SectionsManager />}
        </main>
      </div>
    </div>
  );
}
