import { List, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AttributeOption } from "~/schemas";

export default function SelectAttribute({
  value,
  name,
  options,
  onChange,
  onRemove,
}: {
  value: number | null;
  options: AttributeOption[];
  name: string;
  onChange: (value: number | null) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  const selectId = `attribute-${name}`;
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-header-border">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-select-bg border border-select-border mt-0.5">
        <List className="w-3 h-3 text-select-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <label
            htmlFor={selectId}
            className="text-xs font-medium text-nav-text-active "
          >
            {name}
          </label>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-medium bg-select-bg text-select-text border border-select-border text-[10px]">
            {t("type.select")}
          </span>
        </div>
        <select
          id={selectId}
          onChange={(e) => {
            const value = e.target.value;

            onChange(value === "" ? null : Number(value));
          }}
          className="w-fit flex-none px-3 py-2.5 rounded-lg bg-table-header border border-table-border"
          value={value ?? ""}
        >
          {value === null && (
            <option value="" disabled>
              {t("page.profile.attributes.selectPlaceholder")}
            </option>
          )}
          {options.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            );
          })}
        </select>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="w-7 h-7 flex items-center justify-center rounded-lg mt-0.5 border border-table-border text-date cursor-pointer hover:bg-table-header"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
