import { useTranslation } from "react-i18next";
import { Checkbox } from "~/components/ui/checkbox";
import type { Position, SelectedPosition } from "~/types/Position";
import PositionsTableRow from "./PositionsTableRow";

export default function PositionsTable({
  selected,
  setSelected,
  positions,
}: {
  positions: Position[];
  selected: SelectedPosition[];
  setSelected: React.Dispatch<React.SetStateAction<SelectedPosition[]>>;
}) {
  const { t } = useTranslation();
  return (
    <div className="mx-2 lg:mx-6 mt-2 rounded-xl overflow-x-auto border border-table-border">
      <table className="w-full table-fixed min-w-225">
        <thead>
          <tr className="uppercase bg-table-header border-b text-xs font-semibold tracking-[0.06em] text-nav-text text-left">
            <th className="px-4 py-2.5 w-[3%]">
              <Checkbox
                className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelected(
                      positions.map((position) => ({
                        id: position.id,
                        updatedAt: position.updatedAt,
                      }))
                    );
                  } else {
                    setSelected([]);
                  }
                }}
                checked={
                  selected.length === 0
                    ? false
                    : selected.length === positions.length
                      ? true
                      : "indeterminate"
                }
              />
            </th>
            <th className="px-4 py-2.5 w-[24%]">
              {t("page.position.table.title")}
            </th>
            <th className="px-4 py-2.5 truncate w-[25%]">
              {t("page.position.table.description")}
            </th>
            <th className="px-4 py-2.5 w-[11%]">
              {t("page.position.table.attributes")}
            </th>
            <th className="px-4 py-2.5 w-[11%]">
              {t("page.position.table.tags")}
            </th>
            <th className="px-4 py-2.5 w-[11%]">
              {t("page.position.table.maxProjects")}
            </th>
            <th className="px-4 py-2.5 w-[15%]">
              {t("page.position.table.created")}
            </th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <PositionsTableRow
              key={position.id}
              position={position}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
