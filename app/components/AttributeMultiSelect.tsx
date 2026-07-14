import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAttribute } from "~/api/getAttributes";
import type { Attribute } from "~/types/Attribute";
import AttributeChip from "~/utils/attribute_types/AttributeChip";

export default function AttributeMultiSelect() {
  const { t } = useTranslation();
  const [attribute, setAttribute] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([]);
  const [attributeResults, setAttributeResults] = useState<Attribute[]>([]);

  const attributeSuggestions = attributeResults.filter(
    (attribute) => !selectedAttributes.some((a) => a.id === attribute.id)
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      const attributes = await getAttribute(attribute);
      setAttributeResults(attributes);
    }, 400);
    return () => clearTimeout(timer);
  }, [attribute]);
  return (
    <>
      <label
        htmlFor="attributes"
        className="text-xs font-medium text-hr mt-1.5"
      >
        {t("page.position.dialog.attributes")}
      </label>
      {selectedAttributes.length > 0 && (
        <div className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date">
          {selectedAttributes.map((attribute) => (
            <AttributeChip
              key={attribute.id}
              name={attribute.name}
              onClick={() =>
                setSelectedAttributes((prev) =>
                  prev.filter((a) => a.id != attribute.id)
                )
              }
            />
          ))}

          {selectedAttributes.map((attribute) => (
            <input
              type="hidden"
              name="attributeIds"
              key={attribute.id}
              value={attribute.id}
            />
          ))}
        </div>
      )}
      <input
        type="text"
        name="attribute"
        id="attribute"
        value={attribute}
        onChange={(e) => setAttribute(e.target.value)}
        className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
        placeholder={t("page.position.dialog.attributePlaceholder")}
      />
      {attributeSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {attributeSuggestions.map((attribute) => (
            <button
              className="px-2 py-0.5 rounded font-medium bg-[#fff1f0] text-[#c0392b] dark:bg-[#c0392b] dark:text-[#fff1f0] text-xs"
              key={attribute.id}
              type="button"
              onClick={() => {
                if (selectedAttributes.some((a) => a.id === attribute.id))
                  return;
                setSelectedAttributes((prev) => [...prev, attribute]);
                setAttribute("");
              }}
            >
              {attribute.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
