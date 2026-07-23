import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import { getCVs } from "~/api/getCV";
import CVsHeader from "~/components/cvs/CVsHeader";
import Pagination from "~/components/Pagination";
import { positionLevelLabels } from "~/components/PositionDialog";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import type { Route } from "./+types/cvs";
import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import CVsSearch from "~/components/cvs/CVsSearch";

export async function clientLoader({ url }: Route.LoaderArgs) {
  const searchParams = new URL(url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const data = await getCVs(page, search);
  return data;
}

export default function CVs() {
  const { t } = useTranslation();
  const { cvs, totalPages, totalCount } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const { page, setPage } = useCustomSearchParams();

  return (
    <main className="flex flex-col min-h-screen bg-table-header">
      <CVsHeader page={page} totalCount={totalCount} totalPages={totalPages} />
      <CVsSearch />

      <div className="mx-2 lg:mx-6 rounded-xl overflow-x-auto border border-table-border">
        <table className="w-full table-fixed min-w-225">
          <thead>
            <tr className="bg-table-header border-b border-table-border text-[11px] font-semibold text-nav-text uppercase tracking-[0.06em] text-left">
              <th className="px-4 py-2.5 w-[50%]">
                {t("page.cvs.table.candidate")}
              </th>
              <th className="px-4 py-2.5 w-[35%]">
                {t("page.cvs.table.position")}
              </th>
              <th className="px-4 py-2.5 w-[15%]">
                {t("page.cvs.table.published")}
              </th>
            </tr>
          </thead>
          <tbody>
            {cvs.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-date">
                  {t("page.cvs.empty")}
                </td>
              </tr>
            ) : (
              cvs.map((cv) => (
                <tr
                  key={cv.id}
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
                      <span className="text-nav-text">
                        {cv.position.company}
                      </span>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
