import { ToggleLeft, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import NotSpecified from "../NotSpecified";

export default function BooleanAttribute({
  value,
  name,
  onChange,
  onRemove,
}: {
  value: boolean | null;
  name: string;
  onChange: (value: boolean | null) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-header-border">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-boolean-bg border border-boolean-border mt-0.5">
        <ToggleLeft className="w-3 h-3 text-boolean-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-nav-text-active ">
            {name}
          </label>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-medium bg-boolean-bg text-boolean-text border border-boolean-border text-[10px]">
            {t("type.boolean")}
          </span>
        </div>
        <Checkbox
          checked={
            value === true ? true : value === false ? false : "indeterminate"
          }
          onCheckedChange={(checked) =>
            onChange(checked === true ? true : checked === false ? false : null)
          }
          className="h-5 w-5 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
        />
        {value === null && <NotSpecified />}
      </div>
      <button
        onClick={onRemove}
        type="button"
        className="w-7 h-7 flex items-center justify-center rounded-lg mt-0.5 border border-table-border text-date cursor-pointer hover:bg-table-header"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
