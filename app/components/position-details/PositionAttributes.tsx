import { Layers } from "lucide-react";
import type { Attribute } from "~/types/Attribute";
import { AttributeTypeC } from "../AttributeTypeC";
import { useTranslation } from "react-i18next";

export default function PositionAttributes({
  attributes,
}: {
  attributes: Attribute[];
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-header border border-table-border w-full min-w-0">
      <div className="flex items-center gap-2 border-b border-header-border pb-3">
        <Layers className="w-3.5 h-3.5 text-nav-text shrink-0" />
        <span className="text-[13px] font-semibold text-nav-text-active">
          {t("page.positionDetails.attributes")}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        {attributes.map((attribute) => (
          <div
            key={attribute.id}
            className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg bg-table-header border border-header-border min-w-0"
          >
            <div className="min-w-0 flex-1">
              <h1 className="text-[13px] text-nav-text-active font-medium break-words">
                {attribute.name}
              </h1>
              <p className="text-xs text-nav-text mt-0.5 break-all">
                {attribute.description}
              </p>
            </div>
            <div className="shrink-0">
              <AttributeTypeC type={attribute.type} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
