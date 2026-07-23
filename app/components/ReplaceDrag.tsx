import { ArrowUpFromLine } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReplaceDrag() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-header border-2 border-dashed border-table-border w-48 lg:w-72 mt-1.5 hover:bg-table-header transition-colors">
      <div className="flex items-center gap-2 text-nav-text">
        <ArrowUpFromLine className="w-3 h-3 " />
        <span className="text-xs">
          {t("page.profile.attributes.replaceImage")}
        </span>
      </div>
    </div>
  );
}
