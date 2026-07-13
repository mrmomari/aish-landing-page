import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteHolding, fetchHoldings, updateHolding } from "../lib/data";
import type { Holding } from "../lib/types";
import { HoldingEditor } from "./HoldingEditor";

export function HoldingsManager() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Holding | null | "new">(null);

  const load = async () => {
    setLoading(true);
    setHoldings(await fetchHoldings());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (holding: Holding) => {
    if (!confirm(`Delete "${holding.name}"? This cannot be undone.`)) return;
    await deleteHolding(holding.id);
    await load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= holdings.length) return;
    const a = holdings[index];
    const b = holdings[target];
    await Promise.all([
      updateHolding(a.id, { sort_order: b.sort_order }),
      updateHolding(b.id, { sort_order: a.sort_order }),
    ]);
    await load();
  };

  const toggleVisible = async (holding: Holding) => {
    await updateHolding(holding.id, { visible: !holding.visible });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-white">Holding companies</h2>
          <p className="mt-2 text-sm text-white/50">Add, edit, reorder, and show or hide portfolio companies.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="flex items-center gap-2 rounded-md bg-[#d6b878] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#111518] hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add holding
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-white/50">Loading…</p>
      ) : (
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {holdings.map((holding, index) => (
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
                  disabled={index === holdings.length - 1}
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
          {holdings.length === 0 && <p className="py-8 text-center text-white/40">No holding companies yet.</p>}
        </div>
      )}

      {editing && (
        <HoldingEditor
          holding={editing === "new" ? null : editing}
          nextSortOrder={holdings.length}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}
