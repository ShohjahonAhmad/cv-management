import { BookOpen, FolderOpen, Funnel, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "~/components/ui/checkbox";
import AttributeCount from "~/utils/attribute_types/AttributeCount";
import PositionLevel from "~/utils/attribute_types/ProjectCount";
import Tag from "~/utils/attribute_types/Tag";
import type { Route } from "./+types/positions";
import { getPositions } from "~/api/getPositions";
import { useLoaderData } from "react-router";
import type { Position } from "~/types/Position";

export async function clientLoader({ url }: Route.ClientLoaderArgs) {
  const positions = await getPositions();

  return positions;
}

export default function Positions() {
  const { t } = useTranslation();
  const { positions, total, totalPages } = useLoaderData();
  return (
    <main>
      <div className="px-6 py-5 flex items-start justify-between">
        <div>
          <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
            {t("page.position.title")}
          </h1>
          <p className="text-xs text-nav-text mt-0.5 max-w-130">
            {t("page.position.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
            <FolderOpen className="w-3.5 h-3.5 text-date" />
            <span className="text-xs font-medium text-hr">
              48 {t("page.position.positions")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
            <BookOpen className="w-3.5 h-3.5 text-date" />
            <span className="text-xs font-medium text-hr">
              {t("page.position.page", { page: 1, totalPages: 4 })}
            </span>
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-nav-border-active text-white cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            {t("page.position.newPosition")}
          </button>
        </div>
      </div>
      <div className="px-6 py-3 flex justify-between items-center gap-3 border-y border-border">
        <div>
          <input
            type="text"
            placeholder={t("page.position.searchPlaceholder")}
            className="text-xs text-date px-3 py-2 rounded-lg bg-table-header border border-table-border min-w-[260px]"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-date">
          <Funnel className="w-3 h-3" />
          <span>{t("page.position.show", { positions: 12, total: 48 })}</span>
        </div>
      </div>

      <div className="mx-6 my-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
        <div className="flex items-center gap-2 mr-2">
          <Checkbox
            checked={true}
            className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          />
          <span className="text-xs font-semibold text-white">
            {0} {t("page.position.selected")}
          </span>
        </div>
        <hr className="w-px mx-1 h-5 bg-hr" />
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#dc2626] text-white cursor-pointer">
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t("page.position.delete")}</span>
        </button>
      </div>
      <div className="mx-6 mt-2 rounded-xl overflow-hidden border border-table-border">
        <table className="w-full table-fixed">
          <thead>
            <tr className="uppercase bg-table-header border-b text-xs font-semibold tracking-[0.06em] text-nav-text text-left">
              <th className="px-4 py-2.5 w-[3%]">
                <Checkbox className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
              </th>
              <th className="px-2 py-2.5 w-[24%]">
                {t("page.position.table.title")}
              </th>
              <th className="px-4 py-2.5 truncate w-[25%]">
                {t("page.position.table.description")}
              </th>
              <th className="px-4 py-2.5 w-[11%]">
                {t("page.position.table.attributes")}
              </th>
              <th className="px-4 py-2.5 w-[11%]">
                {t("page.position.table.tags")}
              </th>
              <th className="px-4 py-2.5 w-[11%]">
                {t("page.position.table.maxProjects")}
              </th>
              <th className="px-4 py-2.5 w-[15%]">
                {t("page.position.table.created")}
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position: Position) => (
              <tr className="text-xs">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  </div>
                </td>
                <td className="px-2 py-2.5">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-nav-text-active">
                      {position.title}
                    </span>
                    <span className="mt-0.5 text-xs text-nav-text">
                      {position.company} • {position.level}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-nav-text">
                  {position.description}
                </td>
                <td className="px-4 py-2.5">
                  <AttributeCount count={position.positionAttributes.length} />
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {position.positionProjectTags.map((tag) => (
                      <Tag key={tag.projectTag.id} name={tag.projectTag.name} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <PositionLevel count={position.maxProjects} />
                </td>
                <td className="px-4 py-2.5 text-nav-text">
                  {position.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
