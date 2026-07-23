import { buildAttributePayload } from "~/utils/buildPayload";
import Attribute from "../attributes/AttributeValue";
import { Layers, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { AttributeValue, Profile } from "~/types/Profile";

export default function ProfileAttributes({
  profile,
  setIsOpen,
  readOnly,
}: {
  profile: Profile;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readOnly: boolean;
}) {
  const [attributeValues, setAttributeValues] = useState<AttributeValue[]>(
    profile.attributeValues || []
  );
  const { t } = useTranslation();

  useEffect(() => {
    setAttributeValues(profile.attributeValues || []);
  }, [profile.attributeValues]);

  return (
    <div className="rounded-xl overflow-hidden overflow-x-auto border border-table-border bg-table-header">
      <div className="flex items-center justify-between px-6 py-4 border-b border-header-border">
        <div className="flex items-center gap-3">
          <div className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center bg-header-border border border-table-border">
            <Layers className="w-3.5 h-3.5 text-hr" />
          </div>
          <div>
            <p className="font-semibold text-sm text-nav-text-active">
              {t("page.profile.attributes.title")}
            </p>
            <p className="text-xs text-nav-text mt-0.5">
              {t("page.profile.attributes.subtitle")}
            </p>
          </div>
        </div>
        {!readOnly && (
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-header-border border border-table-border"
          >
            <Plus className="w-3 h-3 text-hr" />
            <span className="text-hr">
              {t("page.profile.attributes.addAttribute")}
            </span>
          </button>
        )}
      </div>
      <div className="px-6 py-5">
        <div className="flex flex-col">
          {attributeValues.map((attributeValue) => (
            <Attribute
              readOnly={readOnly}
              key={attributeValue.id}
              attributeValue={attributeValue}
              setAttributeValues={setAttributeValues}
            />
          ))}
          <input
            hidden
            readOnly
            name="attributeValues"
            value={JSON.stringify(buildAttributePayload(attributeValues))}
          />
        </div>
      </div>
    </div>
  );
}
