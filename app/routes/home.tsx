import { getPositions } from "~/api/getUsers";
import type { Route } from "./+types/home";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import PositionCard from "~/components/PositionCard";
import type { Position } from "~/types/Position";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import Pagination from "~/components/Pagination";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const result = await getPositions(page);

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
  const { page, setPage } = useCustomSearchParams();
  return (
    <div className="flex flex-col bg-table-header min-h-full w-full">
      <div className="flex flex-col gap-6 px-10 py-8 max-w-[1100px] m-auto">
        <div>
          <h1 className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
            {t("page.home.greeting", { name })}
          </h1>
          <p className="text-[13px] mt-1 text-nav-text">
            {t("page.home.description", { total })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="search"
            name="search"
            type="text"
            className="px-3 py-2.5 rounded-lg flex-1 bg-header border border-table-border text-[13px] text-date"
            placeholder="Search positions by title or company..."
          />
          <select
            name="level"
            id="level"
            value={""}
            className="px-3 py-2.5 rounded-lg bg-header border border-table-border min-w-32"
          >
            <option value="" disabled>
              <div className="flex items-center gap-2">
                {t("page.home.level")}
              </div>
            </option>
          </select>
          <select
            name="newest"
            id="newest"
            value={""}
            className="px-3 py-2.5 rounded-lg bg-header border border-table-border min-w-36"
          >
            <option value="" disabled>
              <div className="flex items-center gap-2">
                {t("page.home.newest")}
              </div>
            </option>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {positions.map((position: Position) => (
            <PositionCard key={position.id} position={position} />
          ))}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
