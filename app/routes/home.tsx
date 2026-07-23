import { getPositions } from "~/api/getUsers";
import type { Route } from "./+types/home";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import PositionCard from "~/components/PositionCard";
import type { Position, PositionLevel } from "~/types/Position";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import Pagination from "~/components/Pagination";
import { useEffect, useState } from "react";
import { positionLevelLabels } from "~/components/PositionDialog";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const level = (searchParams.get("level") as PositionLevel) || "";
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";
  const result = await getPositions(page, search, level, sort);

  return result;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { t } = useTranslation();
  const { positions, pageSize, total, totalPages, name } = useLoaderData();
  const {
    page,
    setPage,
    search: paramSearch,
    setSearch: setParamSearch,
    level,
    setLevel,
    sort,
    setSort,
  } = useCustomSearchParams();
  const [search, setSearch] = useState(paramSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParamSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <div className="flex flex-col min-h-screen bg-table-header w-full items-center">
      <div className="flex flex-col gap-6 px-2 lg:px-10 py-8 max-w-[1100px] w-full">
        <div>
          <h1 className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
            {t("page.home.greeting", { name })}
          </h1>
          <p className="text-[13px] mt-1 text-nav-text">
            {t("page.home.description", { total })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            id="search"
            name="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2.5 rounded-lg flex-1 bg-header border border-table-border text-[13px] text-date"
            placeholder="Search positions by title or company..."
          />
          <select
            name="level"
            id="level"
            value={level}
            className="px-3 py-2.5 rounded-lg bg-header border border-table-border min-w-32"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">{t("page.home.level")}</option>
            {Object.entries(positionLevelLabels).map(([level, label]) => (
              <option value={level} key={level}>
                {t(label)}
              </option>
            ))}
          </select>
          <select
            name="newest"
            id="newest"
            value={sort}
            onChange={(e) => setSort(e.target.value as "asc" | "desc")}
            className="px-3 py-2.5 rounded-lg bg-header border border-table-border min-w-36"
          >
            <option value="desc">{t("page.home.newest")}</option>
            <option value="asc">{t("page.home.oldest")}</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nav-border-active text-white border-0 text-[13px] font-semibold">
            {t("page.home.allPositions")}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-white text-[10px] font-semibold bg-[#FFFFFF26]">
              {total}
            </span>
          </button>
        </div>
        {positions.length === 0 ? (
          <div className="flex items-center justify-center py-16 border border-dashed border-table-border rounded-xl">
            <p className="text-sm text-nav-text">
              {t("page.home.noPositions")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {positions.map((position: Position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        )}

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
