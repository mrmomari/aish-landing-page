import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { Holding } from "../lib/types";
import { HoldingEditor } from "./HoldingEditor";

export function HoldingsManager({
  holdings,
  onChange,
}: {
  holdings: Holding[];
  onChange: (holdings: Holding[]) => void;
}) {
  const [editing, setEditing] = useState<Holding | null | "new">(null);

  const sorted = [...holdings].sort((a, b) => a.sort_order - b.sort_order);

  const handleDelete = (holding: Holding) => {
    if (!confirm(`Delete "${holding.name}"? This takes effect once you publish.`)) return;
    onChange(holdings.filter((h) => h.id !== holding.id));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sorted.length) return;
    const reordered = [...sorted];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    onChange(reordered.map((h, i) => ({ ...h, sort_order: i })));
  };

  const toggleVisible = (holding: Holding) => {
    onChange(holdings.map((h) => (h.id === holding.id ? { ...h, visible: !h.visible } : h)));
  };

  const handleSave = (holding: Holding) => {
    const exists = holdings.some((h) => h.id === holding.id);
    onChange(exists ? holdings.map((h) => (h.id === holding.id ? holding : h)) : [...holdings, holding]);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-white">Holding companies</h2>
          <p className="mt-2 text-sm text-white/50">
            Add, edit, reorder, and show or hide portfolio companies. Publish to make changes live.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="flex items-center gap-2 rounded-md bg-[#d6b878] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#111518] hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add holding
        </button>
      </div>

      <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {sorted.map((holding, index) => (
          <div key={holding.id} className="flex items-center gap-4 py-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-white/5 text-xs font-semibold text-white/60">
              {holding.logo_url ? (
                <img src={holding.logo_url} alt="" className="h-full w-full object-cover" />
              ) : (
                holding.short_code
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{holding.name}</p>
              <p className="truncate text-xs text-white/45">
                {holding.sector} · {holding.stage}
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs text-white/60">
              <input
                type="checkbox"
                checked={holding.visible}
                onChange={() => toggleVisible(holding)}
                className="h-4 w-4"
              />
              Visible
            </label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="rounded p-2 text-white/50 hover:text-white disabled:opacity-20"
                aria-label="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === sorted.length - 1}
                className="rounded p-2 text-white/50 hover:text-white disabled:opacity-20"
                aria-label="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setEditing(holding)}
                className="rounded p-2 text-white/50 hover:text-[#d6b878]"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(holding)}
                className="rounded p-2 text-white/50 hover:text-red-400"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {sorted.length === 0 && <p className="py-8 text-center text-white/40">No holding companies yet.</p>}
      </div>

      {editing && (
        <HoldingEditor
          holding={editing === "new" ? null : editing}
          nextSortOrder={holdings.length}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
