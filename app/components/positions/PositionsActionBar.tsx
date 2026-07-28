import { SquarePen, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { deletePositions } from "~/api/getPositions";
import { useRevalidator } from "react-router";
import type { Dialog, Position, SelectedPosition } from "~/types/Position";

export default function PositionsActionBar({
  positions,
  selected,
  setDialog,
}: {
  positions: Position[];
  selected: SelectedPosition[];
  setDialog: React.Dispatch<React.SetStateAction<Dialog>>;
}) {
  const { t } = useTranslation();
  const { revalidate } = useRevalidator();
  const selectedPosition = positions.find((p) => p.id === selected[0]?.id);

  function buildMessage(
    conflicts: number,
    changeCount: number,
    count: number
  ): string {
    if (conflicts > 0) {
      return t("page.position.toast.conflict", { conflicts, changeCount });
    } else if (count > 0) {
      return t("page.position.toast.changesSaved", { count });
    } else {
      return t("page.position.toast.noChanges");
    }
  }

  async function handleDelete() {
    const { conflicts, changeCount, count } = await deletePositions(selected);
    const message = buildMessage(conflicts, changeCount, count);
    if (conflicts > 0) {
      toast.warning(message);
    } else {
      toast.success(message);
    }
    revalidate();
  }
  return (
    <div className="mx-2 lg:mx-6 flex-wrap my-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
      <div className="flex items-center gap-2 mr-2">
        <Checkbox
          checked={
            selected.length === 0
              ? false
              : selected.length === positions.length
                ? true
                : "indeterminate"
          }
          className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
        />
        <span className="text-xs font-semibold text-white">
          {selected.length} {t("page.position.selected")}
        </span>
      </div>
      <hr className="w-px mx-1 h-5 bg-hr hidden lg:block" />
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-date bg-hr cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={selected.length !== 1}
        onClick={() => {
          setDialog({
            open: true,
            mode: "edit",
            position: selectedPosition,
          });
        }}
      >
        <SquarePen className="w-3.5 h-3.5" />
        <span>{t("page.position.edit")}</span>
        <span className="ml-1 px-1.5 py-0.5 rounded text-xs bg-[#1f2937] dark:bg-indigo-300 text-nav-text text-[10px]">
          {t("page.position.singleSelection")}
        </span>
      </button>
      <hr className="w-px mx-1 h-5 bg-hr hidden lg:block" />
      <button
        disabled={selected.length === 0}
        onClick={handleDelete}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#dc2626] text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>{t("page.position.delete")}</span>
      </button>
    </div>
  );
}
