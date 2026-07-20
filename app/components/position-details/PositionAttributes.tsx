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
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-header border border-table-border">
      <div className="flex items-center gap-2 border-b border-header-border pb-3">
        <Layers className="w-3.5 h-3.5 text-nav-text" />
        <span className="text-[13px] font-semibold text-nav-text-active">
          {t("page.positionDetails.attributes")}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {attributes.map((attribute) => (
          <div
            key={attribute.id}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-table-header border border-header-border"
          >
            <div>
              <h1 className="text-[13px] text-nav-text-active font-medium">
                {attribute.name}
              </h1>
              <p className="text-xs text-nav-text mt-0.5">
                {attribute.description}
              </p>
            </div>
            <span>
              <AttributeTypeC type={attribute.type} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
