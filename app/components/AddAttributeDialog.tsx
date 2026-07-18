import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, useNavigation } from "react-router";
import { searchAttributes } from "~/api/getUsers";
import type { Attribute } from "~/types/Attribute";
import AttributeChip from "~/utils/attribute_types/AttributeChip";
import AttributeRow from "./attributes/AttributeRow";

export default function AddAddributeDialog({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const [attribute, setAttribute] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([]);
  const [attributeResults, setAttributeResults] = useState<Attribute[]>([]);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const attributeSuggestions = attributeResults.filter(
    (attr) => !selectedAttributes.some((selected) => selected.id === attr.id)
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      const attributes = await searchAttributes(attribute);
      setAttributeResults(attributes);
    }, 400);
    return () => clearTimeout(timer);
  }, [attribute]);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-[#00000059]">
      <div className="bg-table-header rounded-2xl shadow-2xl flex flex-col w-125 max-h-[90vh] border border-table-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-bold text-base text-nav-text-active">
              {t("page.profile.attributes.dialog.title")}
            </p>
            <p className="text-xs text-nav-text mt-1">
              {t("page.profile.attributes.dialog.subtitle")}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-hr"
          >
            <X className="w-3.5 h-3.5 text-nav-text" />
          </button>
        </div>
        <Form method="POST" className="px-6 py-5 flex flex-col gap-1.5">
          <input type="hidden" name="intent" value="addAttributes" />
          <label htmlFor="attributes" className="text-xs font-medium text-hr">
            {t("page.profile.attributes.dialog.attributes")}
          </label>
          {selectedAttributes.length > 0 && (
            <div className="flex flex-wrap">
              {selectedAttributes.map((attribute) => (
                <AttributeChip
                  key={attribute.id}
                  name={attribute.name}
                  onClick={() =>
                    setSelectedAttributes((prev) =>
                      prev.filter((attr) => attr.id !== attribute.id)
                    )
                  }
                />
              ))}

              {selectedAttributes.map((attribute) => (
                <input
                  hidden
                  readOnly
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
            <div className="border border-table-border rounded-xl overflow-y-auto scrollbar dark:scrollbar-thumb-table-border dark:scrollbar-track-table-header max-h-96 mt-3">
              {attributeSuggestions.map((attribute) => (
                <AttributeRow
                  attribute={attribute}
                  onChange={() => {
                    setSelectedAttributes((prev) => [...prev, attribute]);
                    setAttribute("");
                  }}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 gap px-6 py-4">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#f3f4f6] text-[#374151] dark:bg-[#374151] dark:text-[#f3f4f6] cursor-pointer"
            >
              {t("page.profile.attributes.dialog.cancel")}
            </button>
            <button
              disabled={selectedAttributes.length === 0 || isSubmitting}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-nav-border-active cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              {selectedAttributes.length === 0
                ? t("page.profile.attributes.dialog.actionNone")
                : t("page.profile.attributes.dialog.action", {
                    count: selectedAttributes.length,
                  })}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
