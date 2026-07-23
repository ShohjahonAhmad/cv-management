import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Position } from "~/types/Position";
import { positionLevelLabels } from "../PositionDialog";
import { formatDistanceToNow, type Locale } from "date-fns";
import { uz, enGB } from "date-fns/locale";
import i18n from "~/config/i18n";

export const languageLocaleMap: Record<string, Locale> = {
  uz: uz,
  en: enGB,
};

export default function PositionHeader({ position }: { position: Position }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-header border border-table-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-semibold bg-header-border border border-table-border text-sm text-hr tracking-[-0.3px]">
            {(position.company.length > 0
              ? position.company[0].toUpperCase()
              : "") +
              (position.company.length > 1
                ? position.company[1].toUpperCase()
                : "")}
          </div>
          <div>
            <h1 className="text-xl font-bold text-nav-text-active tracking-[-0.5px] leading-[1.3]">
              {position.title}
            </h1>
            <p className="text-[13px] text-nav-text mt-[3px]">
              {position.company} · {t(positionLevelLabels[position.level])}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-table-header border border-table-border text-[11px]">
          <Clock className="w-2.5 h-2.5" />{" "}
          {formatDistanceToNow(new Date(position.createdAt), {
            locale: languageLocaleMap[i18n.language],
            addSuffix: true,
          })}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-header-border">
        {position.positionProjectTags.map((tag) => (
          <span
            key={tag.projectTag.name}
            className="inline-flex items-center px-2 py-0.5 rounded font-medium bg-image text-image-text border border-image-border text-[10px]"
          >
            {tag.projectTag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
