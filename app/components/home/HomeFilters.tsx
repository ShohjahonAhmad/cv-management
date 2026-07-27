import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import { positionLevelLabels } from "../PositionDialog";

export default function HomeFilters() {
  const { t } = useTranslation();
  const {
    search: paramSearch,
    setSearch: setParamSearch,
    level,
    setLevel,
    sort,
    setSort,
  } = useCustomSearchParams();
  const [search, setSearch] = useState(paramSearch);

  useEffect(() => {
    setSearch(paramSearch);
  }, [paramSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParamSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        id="search"
        name="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2.5 rounded-lg flex-1 bg-header border border-table-border text-[13px] text-date"
        placeholder={t("page.home.searchPlaceholder")}
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
  );
}
