import { BookOpen, FolderOpen, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PositionsHeader({
  setDialog,
  total,
  page,
  totalPages,
}: {
  setDialog: any;
  total: number;
  page: number;
  totalPages: number;
}) {
  const { t } = useTranslation();
  return (
    <div className="px-6 py-5 flex items-start flex-col gap-2 lg:flex-row justify-between">
      <div>
        <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
          {t("page.position.title")}
        </h1>
        <p className="text-xs text-nav-text mt-0.5 max-w-130">
          {t("page.position.subtitle")}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-1">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
          <FolderOpen className="w-3.5 h-3.5 text-date" />
          <span className="text-xs font-medium text-hr">
            {total} {t("page.position.positions")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
          <BookOpen className="w-3.5 h-3.5 text-date" />
          <span className="text-xs font-medium text-hr">
            {t("page.position.page", { page, totalPages })}
          </span>
        </div>
        <button
          onClick={() => setDialog({ open: true, mode: "create" })}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-nav-border-active text-white cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t("page.position.newPosition")}
        </button>
      </div>
    </div>
  );
}
