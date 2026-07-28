import { Library, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Dialog } from "~/types/Attribute";

export default function AttributeHeader({
  setDialog,
  total,
}: {
  total: number;
  setDialog: React.Dispatch<React.SetStateAction<Dialog>>;
}) {
  const { t } = useTranslation();
  return (
    <div className="px-6 py-5 flex items-center gap-4 flex-col lg:flex-row justify-between">
      <div>
        <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
          {t("page.attribute.title")}
        </h1>
        <p className="text-xs text-nav-text mt-0.5">
          {t("page.attribute.subtitle")}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
          <Library className="w-3.5 h-3.5 text-nav-text" />
          <span className="font-medium text-xs text-hr">
            {total} {t("page.attribute.attributes")}
          </span>
        </div>
        <button
          onClick={() => setDialog({ open: true, mode: "create" })}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-nav-border-active text-white cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t("page.attribute.newAttribute")}
        </button>
      </div>
    </div>
  );
}
