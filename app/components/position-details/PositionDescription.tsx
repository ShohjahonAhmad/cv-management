import { AlignLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PositionDescription({
  description,
}: {
  description: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-header border border-table-border">
      <div className="flex items-center gap-2 border-b border-header-border pb-3">
        <AlignLeft className="w-3.5 h-3.5 text-nav-text" />
        <span className="text-[13px] font-semibold text-nav-text-active">
          {t("page.positionDetails.description")}
        </span>
      </div>
      <div className="text-[13px] text-hr leading-[1.8] whitespace-pre-line">
        {description}
      </div>
    </div>
  );
}
