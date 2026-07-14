import { useSearchParams } from "react-router";

export default function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

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

  return {
    page,
    setPage,
    search,
    setSearch,
  };
}
