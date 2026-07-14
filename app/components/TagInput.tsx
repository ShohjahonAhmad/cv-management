import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { set } from "zod";
import { getTags } from "~/api/getPositions";
import type { ProjectTag } from "~/types/Position";
import TagChip from "~/utils/attribute_types/TagChip";

export default function TagMultiSelect() {
  const { t } = useTranslation();
  const [tag, setTag] = useState("");
  const [tagResults, setTagResults] = useState<ProjectTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ProjectTag[]>([]);
  const tagSuggestions = tagResults.filter(
    (tag) => !selectedTags.some((t) => t.id === tag.id)
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      const tags = await getTags(tag);
      setTagResults(tags);
    }, 400);

    return () => clearTimeout(timer);
  }, [tag]);
  return (
    <>
      <label htmlFor="tags" className="text-xs font-medium text-hr">
        {t("page.position.dialog.projectTags")}
      </label>
      {selectedTags.length > 0 && (
        <div className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date">
          {selectedTags.map((tag) => (
            <TagChip
              key={tag.id}
              name={tag.name}
              onClick={() =>
                setSelectedTags((prev) => prev.filter((t) => t.id != tag.id))
              }
            />
          ))}
          {selectedTags.map((tag) => (
            <input key={tag.id} type="hidden" name="tags" value={tag.name} />
          ))}
        </div>
      )}
      <input
        type="text"
        name="tag"
        id="tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();

          const value = tag.trim();

          if (!value) return;

          if (selectedTags.some((t) => t.name === value)) return;

          const existing = tagSuggestions.find((t) => t.name === value);

          if (existing) {
            setSelectedTags((prev) => [...prev, existing]);
          } else {
            setSelectedTags((prev) => [
              ...prev,
              { id: Math.random(), name: value },
            ]);
          }
          setTagResults([]);
          setTag("");
        }}
        className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
        placeholder={t("page.position.dialog.projectTagsPlaceholder")}
      />
      {tagSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tagSuggestions.map((tag) => (
            <button
              className="px-2 py-0.5 rounded font-medium bg-[#fff7ed] text-[#c2410c] dark:bg-[#c2410c] dark:text-[#fff7ed] text-xs"
              key={tag.id}
              type="button"
              onClick={() => {
                if (selectedTags.some((t) => t.id === tag.id)) return;
                setSelectedTags((prev) => [...prev, tag]);
                setTag("");
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
