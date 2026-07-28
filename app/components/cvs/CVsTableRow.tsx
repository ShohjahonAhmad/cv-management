import { useNavigate } from "react-router";
import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import { positionLevelLabels } from "~/components/PositionDialog";
import type { CV } from "~/types/CV";
import { useTranslation } from "react-i18next";

export default function CVsTableRow({ cv }: { cv: CV }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <tr
      onClick={() => navigate(`/cvs/${cv.id}`)}
      className="border-b group-last:border-0 border-table-border hover:bg-table-border cursor-pointer transition-colors duration-200"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={cv.candidate.photoUrl || "/image.png"}
            className="w-8 h-8 rounded-full shrink-0"
            alt="CandidateAvatar"
          />
          <p className="font-medium text-[13px] text-nav-text-active truncate">
            {cv.candidate.firstName} {cv.candidate.lastName}
          </p>
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium text-[13px] text-nav-text-active mb-0.5 truncate">
          {cv.position.title}
        </p>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-nav-text">{cv.position.company}</span>
          <span className="text-drag-border">·</span>
          <span className="text-nav-text">
            {t(positionLevelLabels[cv.position.level])}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-date">
        {cv.publishedAt
          ? format(new Date(cv.publishedAt), "dd MMM, yyyy", {
              locale: languageLocaleMap[i18n.language],
            })
          : t("page.cvs.table.defaultPublished")}
      </td>
    </tr>
  );
}
