import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";

export default function CVsSearch() {
  const { setSearch: setSearchParam, search: searchParam } =
    useCustomSearchParams();
  const [search, setSearch] = useState(searchParam);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParam(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);
  const { t } = useTranslation();
  return (
    <div className="px-3 pt-4 pb-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("page.cvs.searchPlaceholder")}
        className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border w-full max-w-md text-[13px] text-date"
      />
    </div>
  );
}
