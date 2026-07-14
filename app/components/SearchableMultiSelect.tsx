type SearchableMultiSelectProps<T> = {
  label: string;
  placeholder: string;

  value: string;
  onValueChange: (value: string) => void;

  results: T[];
  selected: T[];

  getId: (item: T) => number;
  getLabel: (item: T) => string;

  onSelect: (item: T) => void;
  onRemove: (item: T) => void;

  chipColor: string;
};

export default function SearchableMultiSelect({
  label,
  placeholder,
  value,
  onValueChange,
  results,
  selected,
  getId,
  getLabel,
  onSelect,
  onRemove,

  chipColor,
}: SearchableMultiSelectProps<T>) {
  const suggestions = results.filter(
    (item: { id: number }) =>
      !selected.some(
        (selectedItem: { id: number }) => selectedItem.id === item.id
      )
  );
  return (
    <>
      <label htmlFor={label} className="text-xs font-medium text-hr">
        {label}
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
            <input key={tag.id} type="hidden" name="tagIds" value={tag.id} />
          ))}
        </div>
      )}
      <input
        type="text"
        name="tag"
        id="tag"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
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
                if (selectedTags.find((t) => t.id === tag.id)) return;
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
