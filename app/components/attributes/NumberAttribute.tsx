import { Hash, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { number } from "zod";

export default function NumberAttribute({
  value,
  name,
  onChange,
  onRemove,
}: {
  value: number;
  name: string;
  onChange: (value: number) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-header-border">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-number-bg border border-number-border mt-0.5">
        <Hash className="w-3 h-3 text-number-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-nav-text-active ">
            {name}
          </label>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-medium bg-number-bg text-number-text border border-number-border text-[10px]">
            {t("type.number")}
          </span>
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.valueAsNumber)}
          className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border w-40"
        />
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
