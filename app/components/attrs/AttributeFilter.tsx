import { Funnel } from "lucide-react";
import { useTranslation } from "react-i18next";
import { attributeCategoryLabels } from "./AttributeDialog";
import { useEffect, useState } from "react";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";

export default function AttributeFilter({
  length,
  total,
}: {
  length: number;
  total: number;
}) {
  const { t } = useTranslation();
  const {
    setSearch: setSearchParam,
    search: searchParam,
    filter,
    setFilter,
  } = useCustomSearchParams();
  const [search, setSearch] = useState<string>(searchParam);

  useEffect(() => {
    const delayedParam = setTimeout(() => {
      setSearchParam(search);
    }, 400);

    return () => clearTimeout(delayedParam);
  }, [search]);
  return (
    <div className="px-6 py-3 flex flex-wrap justify-between items-center gap-3 border-y border-border">
      <div className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("page.attribute.searchPlaceholder")}
          className="text-xs text-date px-3 py-2 rounded-lg bg-table-header border border-table-border w-full sm:min-w-65"
        />
        <select
          name="filter"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border mt-1.5 border-table-border rounded-lg px-3 py-2 bg-table-header text-xs lg:ml-3"
        >
          <option value="all">{t("page.attribute.allCategories")}</option>
          {Object.entries(attributeCategoryLabels).map(([type, label]) => (
            <option key={type} value={type}>
              {t(label)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-date">
        <Funnel className="w-3 h-3" />
        <span>{t("page.attribute.show", { attributes: length, total })}</span>
      </div>
    </div>
  );
}
