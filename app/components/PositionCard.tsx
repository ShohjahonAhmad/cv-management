import { ArrowRight, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Position } from "~/types/Position";
import { positionLevelLabels } from "./PositionDialog";
import { NavLink } from "react-router";

export default function PositionCard({ position }: { position: Position }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl bg-header border border-table-border">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-semibold bg-header-border border-table-border text-[13px] text-hr tracking-[-0.3px]">
          {position.company[0].toUpperCase() +
            position.company[1].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <div>
              <p className="font-semibold text-sm text-nav-text-active tracking-[-0.2px]">
                {position.title}
              </p>
              <p className="text-xs text-nav-text mt-0.5">
                {position.company} · {t(positionLevelLabels[position.level])}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {position.positionProjectTags.map((tag) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded font-medium bg-number text-number-text border border-number-border text-[10px]">
            {tag.projectTag.name}
          </span>
        ))}
      </div>
      <p className="text-xs text-nav-text leading-[1.65] overflow-hidden line-clamp-2">
        {position.description}
      </p>
      <div className="flex items-center justify-between pt-1 border-t border-header-border">
        <div className="flex items-center gap-1 text-[11px] text-date">
          <Layers className="w-3 h-3 text-nav-border-active" />
          <span className="text-hr font-medium">
            {t("page.home.attributesRequired", {
              count: position._count.positionAttributes,
            })}
          </span>
        </div>
        <NavLink
          to={`/positions/${position.id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-header-border text-hr text-xs font-medium border border-table-border"
        >
          <ArrowRight className="w-[11px] h-[11px]" />
          {t("page.home.viewDetails")}
        </NavLink>
      </div>
    </div>
  );
}
