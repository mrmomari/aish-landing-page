import { useEffect, useState } from "react";
import { fetchSections, setSectionVisible } from "../lib/data";
import type { SectionSetting } from "../lib/types";

export function SectionsManager() {
  const [sections, setSections] = useState<SectionSetting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections()
      .then(setSections)
      .finally(() => setLoading(false));
  }, []);

  const toggle = async (section: SectionSetting) => {
    setSections((current) =>
      current.map((s) => (s.section_key === section.section_key ? { ...s, visible: !s.visible } : s))
    );
    await setSectionVisible(section.section_key, !section.visible);
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-medium tracking-[-0.02em] text-white">Page sections</h2>
      <p className="mt-2 text-sm text-white/50">
        Turn sections on or off for the live landing page. Order follows the default layout.
      </p>

      {loading ? (
        <p className="mt-8 text-white/50">Loading…</p>
      ) : (
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {sections.map((section) => (
            <label
              key={section.section_key}
              className="flex cursor-pointer items-center justify-between py-4 text-sm text-white"
            >
              {section.label}
              <input
                type="checkbox"
                checked={section.visible}
                disabled={section.section_key === "hero"}
                onChange={() => toggle(section)}
                className="h-5 w-5 disabled:opacity-30"
              />
            </label>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs text-white/35">
        The hero section cannot be hidden — it anchors page navigation.
      </p>
    </div>
  );
}
