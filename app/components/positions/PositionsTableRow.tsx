import AttributeCount from "~/utils/attribute_types/AttributeCount";
import PositionLevel from "~/utils/attribute_types/ProjectCount";
import Tag from "~/utils/attribute_types/Tag";
import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import { Checkbox } from "../ui/checkbox";
import type { Position, SelectedPosition } from "~/types/Position";
import { useTranslation } from "react-i18next";

export default function PositionsTableRow({
  position,
  selected,
  setSelected,
}: {
  position: Position;
  selected: SelectedPosition[];
  setSelected: React.Dispatch<React.SetStateAction<SelectedPosition[]>>;
}) {
  const { t } = useTranslation();
  return (
    <tr className="text-xs border-b border-table-border last:border-0">
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Checkbox
            className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            checked={selected.some((s) => s.id === position.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelected((prev) => {
                  if (prev.some((s) => s.id === position.id)) return prev;

                  return [
                    ...prev,
                    {
                      id: position.id,
                      updatedAt: position.updatedAt,
                    },
                  ];
                });
              } else {
                setSelected((prev) => prev.filter((s) => s.id !== position.id));
              }
            }}
          />
        </div>
      </td>
      <td className="px-4 py-2.5">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-nav-text-active">
            {position.title}
          </span>
          <span className="mt-0.5 text-xs text-nav-text">
            {position.company} • {position.level}
          </span>
        </div>
      </td>
      <td className="px-4 py-2.5 align-middle">
        <div className="truncate text-nav-text">{position.description}</div>
      </td>
      <td className="px-4 py-2.5">
        <AttributeCount count={position.positionAttributes.length} />
      </td>
      <td className="px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {position.positionProjectTags.map((tag) => (
            <Tag key={tag.projectTag.id} name={tag.projectTag.name} />
          ))}
        </div>
      </td>
      <td className="px-4 py-2.5">
        <PositionLevel count={position.maxProjects} />
      </td>
      <td className="px-4 py-2.5 text-nav-text">
        {position.createdAt
          ? format(new Date(position.createdAt), "dd MMM, yyyy", {
              locale: languageLocaleMap[i18n.language],
            })
          : t("page.cvs.table.defaultPublished")}
      </td>
    </tr>
  );
}
