import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (newPage: number) => void;
  totalPages: number;
}) {
  return (
    <div className="mx-6 mt-3 flex items-center gap-1 justify-end">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft />
      </button>
      {page - 1 > 0 && (
        <button
          onClick={() => setPage(page - 1)}
          className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
        >
          {page - 1}
        </button>
      )}
      <button
        disabled
        className="w-8 h-8 flex text-white text-xs items-center justify-center font-semibold rounded-lg border border-table-border bg-table-header disabled:bg-nav-border-active"
      >
        {page}
      </button>
      {page + 1 <= totalPages && (
        <button
          onClick={() => setPage(page + 1)}
          className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
        >
          {page + 1}
        </button>
      )}
      {page + 2 <= totalPages && (
        <button
          onClick={() => setPage(page + 2)}
          className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
        >
          {page + 2}
        </button>
      )}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
