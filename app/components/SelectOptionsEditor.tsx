import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AttributeOption } from "~/schemas";

export function SelectOptionsEditor({
  options,
  setOptions,
}: {
  options: AttributeOption[];
  setOptions: React.Dispatch<React.SetStateAction<AttributeOption[]>>;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <label className="text-xs font-medium text-text-hr">
        {t("page.attribute.dialog.options")}
      </label>
      <div className="flex flex-col gap-2 mt-2">
        {options.map((option, index) => (
          <div
            className="flex items-center gap-2"
            key={option.id || `new-${index}`}
          >
            {option.id && (
              <input
                type="hidden"
                name={`attributeOptions[${index}].id`}
                value={option.id}
              />
            )}
            <input
              type="text"
              name={`attributeOptions[${index}].value`}
              defaultValue={option.value}
              className="flex-1 border border-table-border rounded-lg px-3 py-2 bg-table-header text-xs text-nav-text-active"
            />
            <button
              type="button"
              disabled={options.length === 1}
              onClick={() =>
                setOptions((prev) => prev.filter((_, i) => i !== index))
              }
              className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0 bg-[#fef2f2] border-[#fecaca] border text-[#dc2626] dark:text-[#fecaca] dark:bg-[#7f1d1d] dark:border-[#975555]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setOptions((prev) => [...prev, { value: "" }])}
          className="mt-2 flex items-center gap-1.5 text-[#4f46e5] text-xs font-medium cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t("page.attribute.dialog.addOption")}
        </button>
      </div>
    </div>
  );
}
