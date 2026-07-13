import type { SectionSetting } from "../lib/types";

export function SectionsManager({
  sections,
  onChange,
}: {
  sections: SectionSetting[];
  onChange: (sections: SectionSetting[]) => void;
}) {
  const toggle = (section: SectionSetting) => {
    onChange(
      sections.map((s) => (s.section_key === section.section_key ? { ...s, visible: !s.visible } : s))
    );
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#22262b]">Page sections</h2>
      <p className="mt-2 text-sm text-[#6d7177]">
        Turn sections on or off for the live landing page. Publish to make changes live.
      </p>

      <div className="mt-8 divide-y divide-[#e9e5da] border-y border-[#e9e5da]">
        {[...sections]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((section) => (
            <label
              key={section.section_key}
              className="flex cursor-pointer items-center justify-between py-4 text-sm text-[#22262b]"
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
      <p className="mt-4 text-xs text-[#98958b]">
        The hero section cannot be hidden — it anchors page navigation.
      </p>
    </div>
  );
}
