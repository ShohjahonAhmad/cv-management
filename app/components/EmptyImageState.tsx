import { Image } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EmptyImageState() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-header border-2 border-dashed border-table-border w-72 h-30 cursor-pointer hover:bg-table-header transition-colors">
      <div className="w-10 h-10 rounded-4xl flex items-center justify-center bg-header-border border border-table-border">
        <Image className="w-[18px] h-[18px] text-date" />
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs font-medium text-hr">
          {t("page.profile.attributes.dragImage")}
        </span>
        <span className="text-[10px] text-date">
          {t("page.profile.attributes.imageTypes")}
        </span>
      </div>
    </div>
  );
}
