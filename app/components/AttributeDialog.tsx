import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-router";
import {
  AttributeCategory,
  AttributeType,
  type Attribute,
  type Dialog,
} from "~/types/Attribute";
import { SelectOptionsEditor } from "./SelectOptionsEditor";
import type { AttributeOption } from "~/schemas";
import ErrorBanner from "./ErrorBanner";

export const attributeCategoryLabels: Record<AttributeCategory, string> = {
  [AttributeCategory.PERSONAL_INFORMATION]: "category.personalInformation",
  [AttributeCategory.CERTIFICATION]: "category.certification",
  [AttributeCategory.DOMAIN_KNOWLEDGE]: "category.domainKnowledge",
  [AttributeCategory.SOFT_SKILLS]: "category.softSkills",
};

export const attributeTypeLabels: Record<AttributeType, string> = {
  [AttributeType.STRING]: "type.string",
  [AttributeType.TEXT]: "type.text",
  [AttributeType.IMAGE]: "type.image",
  [AttributeType.NUMBER]: "type.number",
  [AttributeType.DATE]: "type.date",
  [AttributeType.PERIOD]: "type.period",
  [AttributeType.BOOLEAN]: "type.boolean",
  [AttributeType.SELECT]: "type.select",
};

type AttributeDialogProps = {
  mode: "create" | "edit";
  attribute?: Attribute;
  setDialog: React.Dispatch<React.SetStateAction<Dialog>>;
  errors: string[] | undefined;
};

export default function AttributeDialog({
  mode,
  attribute,
  setDialog,
  errors,
}: AttributeDialogProps) {
  const isEdit = mode === "edit";
  const { t } = useTranslation();
  const [options, setOptions] = useState<AttributeOption[]>(
    attribute?.attributeOptions || [{ value: "" }]
  );
  const [type, setType] = useState<AttributeType>(
    attribute?.type || AttributeType.STRING
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-[#00000059]">
      <div className="bg-table-header rounded-2xl shadow-2xl flex flex-col w-[500px] border border-table-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-bold text-base text-nav-text-active">
              {isEdit
                ? t("page.attribute.dialog.edit.title")
                : t("page.attribute.dialog.create.title")}
            </p>
            <p className="text-xs text-nav-text mt-1">
              {isEdit
                ? t("page.attribute.dialog.edit.subtitle")
                : t("page.attribute.dialog.create.subtitle")}
            </p>
          </div>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg text-hr"
            onClick={() => setDialog((prev) => ({ ...prev, open: false }))}
          >
            <X className="w-3.5 h-3.5 text-nav-text" />
          </button>
        </div>
        {errors && errors.length > 0 && <ErrorBanner errors={errors} />}
        <Form method="POST" className="px-6 py-5 flex flex-col gap-4">
          <input type="hidden" name="mode" value={mode} />
          {isEdit && (
            <>
              <input type="hidden" name="id" value={attribute?.id} />
              <input
                type="hidden"
                name="updatedAt"
                value={attribute?.updatedAt}
              />
              <input type="hidden" name="type" value={type} />
            </>
          )}
          <label htmlFor="name" className="text-xs font-medium text-hr">
            {t("page.attribute.dialog.name")}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={attribute?.name}
            placeholder={t("page.attribute.dialog.namePlaceholder")}
            className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
          />

          <label htmlFor="description" className="text-xs font-medium text-hr">
            {t("page.attribute.dialog.description")}
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={attribute?.description}
            className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
            placeholder={t("page.attribute.dialog.descriptionPlaceholder")}
          ></textarea>
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col">
              <label htmlFor="category" className="text-xs font-medium text-hr">
                {t("page.attribute.dialog.category")}
              </label>
              <select
                name="category"
                id="category"
                className="border mt-1.5 border-table-border rounded-lg px-3 py-2.5 bg-table-header"
                defaultValue={
                  attribute?.category || AttributeCategory.PERSONAL_INFORMATION
                }
              >
                {Object.entries(attributeCategoryLabels).map(
                  ([type, label]) => (
                    <option key={type} value={type}>
                      {t(label)}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="type" className="text-xs font-medium text-hr">
                {t("page.attribute.dialog.type")}
              </label>
              <select
                disabled={isEdit}
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as AttributeType)}
                className="border mt-1.5 border-table-border rounded-lg px-3 py-2.5 bg-table-header disabled:opacity-50"
              >
                {Object.entries(attributeTypeLabels).map(([type, label]) => (
                  <option key={type} value={type}>
                    {t(label)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {type === AttributeType.SELECT && (
            <SelectOptionsEditor options={options} setOptions={setOptions} />
          )}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setDialog((prev) => ({ ...prev, open: false }))}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#f3f4f6] text-[#374151] dark:bg-[#374151] dark:text-[#f3f4f6]"
            >
              {t("page.attribute.dialog.cancel")}
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-nav-border-active"
            >
              {isEdit
                ? t("page.attribute.dialog.edit.action")
                : t("page.attribute.dialog.create.action")}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
