import { Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";

export default function PositionsSearch({
  total,
  pageSize,
}: {
  total: number;
  pageSize: number;
}) {
  const { t } = useTranslation();
  const { search: paramSearch, setSearch: setParamSearch } =
    useCustomSearchParams();
  const [search, setSearch] = useState(paramSearch);

  useEffect(() => {
    const delayedParam = setTimeout(() => {
      setParamSearch(search);
    }, 400);

    return () => clearTimeout(delayedParam);
  }, [search]);
  return (
    <div className="px-6 py-3 flex-wrap flex justify-between items-center gap-3 border-y border-border">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("page.position.searchPlaceholder")}
          className="text-xs text-date px-3 py-2 rounded-lg bg-table-header border border-table-border min-w-65"
        />
      </div>
      <div className="flex items-center gap-1.5 text-xs text-date">
        <Funnel className="w-3 h-3" />
        <span>
          {t("page.position.show", {
            pageSize,
            total,
          })}
        </span>
      </div>
    </div>
  );
}
