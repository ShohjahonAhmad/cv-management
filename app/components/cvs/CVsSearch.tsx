import { useEffect, useState } from "react";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";

export default function Search({ placeholder }: { placeholder: string }) {
  const { setSearch: setSearchParam, search: searchParam } =
    useCustomSearchParams();
  const [search, setSearch] = useState(searchParam);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParam(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <div className="px-2 lg:px-6 pt-4 pb-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2.5 rounded-lg bg-table-header border border-table-border w-full max-w-md text-[13px] text-date"
      />
    </div>
  );
}
