import { ArrowRight, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { positionLevelLabels } from "../PositionDialog";
import CVMode from "~/utils/cv_status/CVStatus";
import { type CV } from "~/types/CV";
import { format } from "date-fns";
import { languageLocaleMap } from "../position-details/PositionHeader";
import i18n from "~/config/i18n";
import { NavLink } from "react-router";

export default function ProfileCVs({ cvs }: { cvs: CV[] }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl overflow-hidden border border-table-border bg-header">
      <div className="flex items-center justify-between px-6 py-4 border-b border-header-border">
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-header-border border border-table-border">
            <FileText className="w-[15px] h-[15px] text-hr" />
          </div>
          <div>
            <p className="font-semibold text-sm text-nav-text-active">
              {t("page.profile.cvs.title")}
            </p>
            <p className="text-xs text-nav-text mt-px">
              {t("page.profile.cvs.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="flex flex-col gap-3">
          {cvs.length === 0 ? (
            <div className="flex items-center justify-center gap-3 py-8 px-4 rounded-lg bg-table-header border border-table-border border-dashed">
              <FileText className="w-4 h-4 text-hr" />
              <p className="text-xs text-date">{t("page.profile.cvs.empty")}</p>
            </div>
          ) : (
            cvs.map((cv) => (
              <div
                key={cv.id}
                className="flex items-start justify-between gap-4 p-4 rounded-lg bg-table-header border border-table-border"
              >
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[13px] text-nav-text-active truncate">
                      {cv.position.title}
                    </span>
                    <span className="text-xs text-date">
                      {cv.position.company}
                    </span>
                    <span className="font-medium text-[10px] text-date">
                      {t(positionLevelLabels[cv.position.level])}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CVMode status={cv.status} />
                    <span className="text-[11px] text-date">
                      <span className="mx-1">
                        {t("page.profile.cvs.updated")}
                      </span>
                      {format(new Date(cv.updatedAt), "dd MMM, yyyy", {
                        locale: languageLocaleMap[i18n.language],
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <NavLink
                    to={`/cvs/${cv.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nav-border-active text-white text-xs font-medium"
                  >
                    <ArrowRight className="w-[11px] h-[11px]" />
                    {t("page.profile.cvs.view")}
                  </NavLink>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
