import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Attribute } from "~/types/Attribute";
import { attributeCategoryLabels } from "../AttributeDialog";

export default function DateRow({
  attribute,
  onChange,
}: {
  attribute: Attribute;
  onChange: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div
      onClick={onChange}
      className="flex gap-3 px-4 py-3 border-b border-table-border last:border-b-0 cursor-pointer hover:bg-[#F0F7FF] dark:hover:bg-[#0F1E38] transition-colors"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-date-bg border border-date-border mt-0.5">
        <Calendar className="w-3 h-3 text-date-text" />
      </div>
      <div className="flex flex-col gap-1.5 flex-1  min-w-0">
        <span className="text-xs font-medium text-nav-text-active">
          {attribute.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded font-medium bg-date-bg text-date-text border border-date-border text-[10px]">
            {t("type.date")}{" "}
          </span>
          <span className="text-date text-[10px] leading-[15px]">
            {t(attributeCategoryLabels[attribute.category])}
          </span>
        </div>
        <span className="text-date text-xs truncate">
          {attribute.description}
        </span>
      </div>
    </div>
  );
}
