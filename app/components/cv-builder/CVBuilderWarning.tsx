import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CVBuilderWarning({ missing }: { missing: number }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-warning border border-warning-border">
      <AlertTriangle className="w-[15px] h-[15px] text-warning-text mt-px" />
      <div>
        <p className="text-[13px] font-semibold text-warning-text">
          {t("page.cvBuilder.warning", { count: missing })}
        </p>
        <p className="text-xs text-warning-text mt-px">
          {t("page.cvBuilder.warningSubtitle")}
        </p>
      </div>
    </div>
  );
}
