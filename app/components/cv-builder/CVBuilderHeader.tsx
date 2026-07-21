import { ArrowLeft, Pencil, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigation } from "react-router";

export default function CVBuilderHeader() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="px-8 py-5 flex items-center justify-between bg-header border-b border-border w-full">
      <div className="flex items-center gap-3">
        <NavLink
          to=".."
          className="flex items-center gap-1.5 text-[13px] text-nav-text font-medium"
        >
          <ArrowLeft className="w-[13px] h-[13px]" />
          {t("page.cvBuilder.back")}
        </NavLink>
        <span className="text-drag-border">·</span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-[18px] text-nav-text-active tracking-[-0.4px]">
              Senior Frontend Engineer
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-warning text-[11px] text-warning-text border border-warning-border font-medium">
              <Pencil className="w-2.5 h-2.5" />
              {t("page.cvBuilder.draft")}
            </span>
          </div>
          <p className="text-xs text-nav-text mt-0.5">
            SAP · Berlin, Germany · Senior
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          name="intent"
          value="save"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-nav-border-active text-white"
        >
          <Save className="w-[13px] h-[13px]" />
          {t("page.cvBuilder.save")}
        </button>
      </div>
    </div>
  );
}
