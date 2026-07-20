import { Type, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import NotSpecified from "../NotSpecified";

export default function StringAttribute({
  value,
  name,
  onChange,
  onRemove,
}: {
  value: string | null;
  name: string;
  onChange: (value: string | null) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-header-border">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-string-bg border border-string-border mt-0.5">
        <Type className="w-3 h-3 text-string-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-nav-text-active ">
            {name}
          </label>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-medium bg-string-bg text-string-text border border-string-border text-[10px]">
            {t("type.string")}
          </span>
        </div>
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => {
            const value = e.target.value.trim();
            onChange(value === "" ? null : value);
          }}
          className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border"
        />
        {value === null && <NotSpecified />}
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
