import type { Route } from "./+types/cvs";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import { getCVs } from "~/api/getCV";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import CVsHeader from "~/components/cvs/CVsHeader";
import Search from "~/components/cvs/CVsSearch";
import CVsTable from "~/components/cvs/CVsTable";
import Pagination from "~/components/Pagination";

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
  const { page, setPage } = useCustomSearchParams();

  return (
    <main className="flex flex-col min-h-screen bg-table-header">
      <CVsHeader page={page} totalCount={totalCount} totalPages={totalPages} />
      <Search placeholder={t("page.cvs.searchPlaceholder")} />
      <CVsTable cvs={cvs} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
