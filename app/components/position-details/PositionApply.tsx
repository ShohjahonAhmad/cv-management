import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function PositionApply() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl bg-header border border-table-border">
      <div>
        <p className="text-[13px] font-semibold text-nav-text-active">
          {t("page.positionDetails.applyTitle")}
        </p>
        <p className="text-xs text-nav-text mt-0.5 leading-normal">
          {t("page.positionDetails.applyDescription")}
        </p>
      </div>

      <NavLink
        to="cv"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold bg-nav-border-active text-white text-[13px]"
      >
        <Send className="w-[13px] h-[13px]" />
        {t("page.positionDetails.apply")}
      </NavLink>
    </div>
  );
}
