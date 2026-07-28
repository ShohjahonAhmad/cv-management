import { getPositions, getStats } from "~/api/getUsers";
import type { Route } from "./+types/home";
import { useLoaderData } from "react-router";
import type { PositionLevel } from "~/types/Position";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import Pagination from "~/components/Pagination";
import HomeStats from "~/components/home/HomeStats";
import HomeFilters from "~/components/home/HomeFilters";
import HomePositions from "~/components/home/HomePositions";
import HomeHeader from "~/components/home/HomeHeader";
import HomeChips from "~/components/home/HomeChips";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const level = (searchParams.get("level") as PositionLevel) || "";
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";
  const [result, stats] = await Promise.all([
    getPositions(page, search, level, sort),
    getStats(),
  ]);

  return { ...result, ...stats };
}

export default function Home() {
  const { positions, total, totalPages, name, ...stats } = useLoaderData();
  const { page, setPage } = useCustomSearchParams();

  return (
    <div className="flex flex-col min-h-screen bg-table-header w-full items-center">
      <div className="flex flex-col gap-6 px-2 lg:px-10 py-8 max-w-275 w-full">
        <HomeHeader name={name} total={total} />
        <HomeStats stats={stats} />
        <HomeFilters />
        <HomeChips total={total} />
        <HomePositions positions={positions} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
