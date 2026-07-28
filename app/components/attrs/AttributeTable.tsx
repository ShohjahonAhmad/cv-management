import { Checkbox } from "../ui/checkbox";
import type { Attribute, SelectedAttribute } from "~/types/Attribute";
import { useTranslation } from "react-i18next";
import AttributeTableRow from "./AttributeTableRow";

export default function AttributeTable({
  attributes,
  selected,
  setSelected,
}: {
  attributes: Attribute[];
  selected: SelectedAttribute[];
  setSelected: React.Dispatch<React.SetStateAction<SelectedAttribute[]>>;
}) {
  const { t } = useTranslation();
  return (
    <div className="mx-2 lg:mx-6 mt-2 rounded-xl overflow-x-auto border border-table-border">
      <table className="w-full table-fixed min-w-225">
        <thead>
          <tr className="uppercase bg-table-header border-b text-xs font-semibold tracking-[0.06em] text-nav-text text-left">
            <th className="px-4 py-2.5 w-[3%]">
              <Checkbox
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelected(
                      attributes.map((attribute) => ({
                        id: attribute.id,
                        updatedAt: attribute.updatedAt,
                      }))
                    );
                  } else {
                    setSelected([]);
                  }
                }}
                checked={
                  selected.length === 0
                    ? false
                    : selected.length === attributes.length
                      ? true
                      : "indeterminate"
                }
                className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
            </th>
            <th className="px-4 py-2.5 w-[32%]">
              {t("page.attribute.table.name")}
            </th>
            <th className="px-4 py-2.5 w-[17%]">
              {t("page.attribute.table.category")}
            </th>
            <th className="px-4 py-2.5 w-[12%]">
              {t("page.attribute.table.type")}
            </th>
            <th className="px-4 py-2.5 w-[24%]">
              {t("page.attribute.table.description")}
            </th>
            <th className="px-4 py-2.5 w-[12%]">
              {t("page.attribute.table.created")}
            </th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attribute) => (
            <AttributeTableRow
              key={attribute.id}
              attribute={attribute}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
