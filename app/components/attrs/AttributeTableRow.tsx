import type { Attribute, SelectedAttribute } from "~/types/Attribute";
import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import AttributeCategoryC from "~/components/AttributeCategoryC";
import { AttributeTypeC } from "~/components/AttributeTypeC";
import { Checkbox } from "../ui/checkbox";
import { useTranslation } from "react-i18next";

export default function AttributeTableRow({
  attribute,
  selected,
  setSelected,
}: {
  attribute: Attribute;
  selected: SelectedAttribute[];
  setSelected: React.Dispatch<React.SetStateAction<SelectedAttribute[]>>;
}) {
  const { t } = useTranslation();
  return (
    <tr className="text-xs border-b border-table-border last:border-0">
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Checkbox
            onCheckedChange={(checked) => {
              setSelected((prev) => {
                if (checked) {
                  return [
                    ...prev,
                    {
                      id: attribute.id,
                      updatedAt: attribute.updatedAt,
                    },
                  ];
                } else {
                  return prev.filter((s) => s.id !== attribute.id);
                }
              });
            }}
            checked={selected.some((s) => s.id === attribute.id)}
            className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          />
        </div>
      </td>
      <td className="px-4 py-2.5 font-medium text-sm text-nav-text-active">
        {attribute.name}
      </td>
      <td className="px-4 py-2.5 truncate text-nav-text">
        <AttributeCategoryC category={attribute.category} />
      </td>
      <td className="px-4 py-2.5">
        <AttributeTypeC type={attribute.type} />
      </td>
      <td className="px-4 py-2.5">
        <div className="truncate">{attribute.description}</div>
      </td>
      <td className="px-4 py-2.5">
        {attribute.createdAt
          ? format(new Date(attribute.createdAt), "dd MMM, yyyy", {
              locale: languageLocaleMap[i18n.language],
            })
          : t("page.cvs.table.defaultPublished")}
      </td>
    </tr>
  );
}
