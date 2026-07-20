import { useSearchParams } from "react-router";
import isPositionLevel from "~/utils/isPositionLevel";

export default function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const level = searchParams.get("level") || "";
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

  function setPage(newPage: number) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", newPage.toString());

      return params;
    });
  }

  function setSearch(search: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      const value = search.trim();

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      return params;
    });
  }

  function setLevel(level: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const value = level.trim();

      if (value && isPositionLevel(value)) {
        params.set("level", level);
      } else {
        params.delete("level");
      }

      params.set("page", "1");

      return params;
    });
  }

  function setSort(sort: "asc" | "desc") {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("sort", sort === "asc" ? "asc" : "desc");
      params.set("page", "1");

      return params;
    });
  }

  return {
    page,
    setPage,
    search,
    setSearch,
    level,
    setLevel,
    sort,
    setSort,
  };
}
