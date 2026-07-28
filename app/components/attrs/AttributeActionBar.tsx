import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import type { Attribute, Dialog, SelectedAttribute } from "~/types/Attribute";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRevalidator } from "react-router";
import { deleteAttribute } from "~/api/getAttributes";

export default function AttributeActionBar({
  setDialog,
  selected,
  attributes,
}: {
  setDialog: React.Dispatch<React.SetStateAction<Dialog>>;
  selected: SelectedAttribute[];
  attributes: Attribute[];
}) {
  const { t } = useTranslation();
  const { revalidate } = useRevalidator();
  const selectedAttribute = attributes.find(
    (a: Attribute) => a.id === selected[0]?.id
  );

  function buildMessage(
    conflicts: number,
    changeCount: number,
    count: number
  ): string {
    if (conflicts > 0) {
      return t("page.attribute.toast.conflict", { conflicts, changeCount });
    } else if (count > 0) {
      return t("page.attribute.toast.changesSaved", { count });
    } else {
      return t("page.attribute.toast.noChanges");
    }
  }
  return (
    <div className="mx-6 my-3 flex flex-wrap items-center gap-x-2 gap-y-3 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
      <div className="flex items-center gap-2 mr-2">
        <Checkbox
          checked={true}
          className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
        />
        <span className="text-xs font-semibold text-white">
          {selected.length} {t("page.attribute.selected")}
        </span>
      </div>
      <hr className="w-px mx-1 h-5 bg-hr hidden lg:block" />
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-date bg-hr cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={selected.length !== 1}
        onClick={() =>
          setDialog({
            open: true,
            mode: "edit",
            attribute: selectedAttribute,
          })
        }
      >
        <SquarePen className="w-3.5 h-3.5" />
        <span>{t("page.attribute.edit")}</span>
        <span className="ml-1 px-1.5 py-0.5 rounded text-xs bg-[#1f2937] dark:bg-indigo-300 text-nav-text text-[10px]">
          {t("page.attribute.singleSelection")}
        </span>
      </button>
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#dc2626] text-white cursor-pointer"
        disabled={selected.length === 0}
        onClick={async () => {
          const { conflicts, changeCount, count } =
            await deleteAttribute(selected);
          const message = buildMessage(conflicts, changeCount, count);
          if (conflicts > 0) {
            toast.warning(message);
          } else {
            toast.success(message);
          }
          revalidate();
        }}
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>{t("page.attribute.delete")}</span>
      </button>
    </div>
  );
}
