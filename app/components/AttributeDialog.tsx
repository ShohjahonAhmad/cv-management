import { X } from "lucide-react";
import React from "react";
import { Form } from "react-router";
import {
  AttributeCategory,
  AttributeType,
  type Attribute,
  type Dialog,
} from "~/types/Attribute";

export const attributeCategoryLabels: Record<AttributeCategory, string> = {
  [AttributeCategory.PERSONAL_INFORMATION]: "Personal Information",
  [AttributeCategory.CERTIFICATION]: "Certification",
  [AttributeCategory.DOMAIN_KNOWLEDGE]: "Domain Knowledge",
  [AttributeCategory.SOFT_SKILLS]: "Soft Skills",
};

export const attributeTypeLabels: Record<AttributeType, string> = {
  [AttributeType.STRING]: "Single-line Text",
  [AttributeType.TEXT]: "Markdown Text",
  [AttributeType.IMAGE]: "Image",
  [AttributeType.NUMBER]: "Number",
  [AttributeType.DATE]: "Date",
  [AttributeType.PERIOD]: "Date Range",
  [AttributeType.BOOLEAN]: "Checkbox",
  [AttributeType.SELECT]: "Dropdown",
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
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000059]">
      <div className="bg-table-header rounded-2xl shadow-2xl flex flex-col w-[500px] border border-table-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-bold text-base text-nav-text-active">
              {isEdit ? "Edit Attribute" : "New Attribute"}
            </p>
            <p className="text-xs text-nav-text mt-1">
              {isEdit
                ? "Update the selected attribute"
                : "Define a reusable attribute for positions and CVs"}
            </p>
          </div>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg text-hr"
            onClick={() => setDialog((prev) => ({ ...prev, open: false }))}
          >
            <X className="w-3.5 h-3.5 text-nav-text" />
          </button>
        </div>
        {errors && errors.length > 0 && (
          <div className="mx-6 mt-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            <p className="font-medium text-red-400">
              Please fix the following:
            </p>

            <ul className="mt-2 list-disc pl-5 text-sm text-red-300">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
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
            </>
          )}
          <label htmlFor="name" className="text-xs font-medium text-hr">
            Attribute Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={attribute?.name}
            placeholder="e.g. Years of Experience"
            className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
          />

          <label htmlFor="description" className="text-xs font-medium text-hr">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={attribute?.description}
            className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
            placeholder="Brief description of what this attribute captures..."
          ></textarea>
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col">
              <label htmlFor="category" className="text-xs font-medium text-hr">
                Category
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
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="type" className="text-xs font-medium text-hr">
                Type
              </label>
              <select
                disabled={isEdit}
                name="type"
                id="type"
                className="border mt-1.5 border-table-border rounded-lg px-3 py-2.5 bg-table-header"
                defaultValue={attribute?.type || AttributeType.STRING}
              >
                {Object.entries(attributeTypeLabels).map(([type, label]) => (
                  <option key={type} value={type}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setDialog((prev) => ({ ...prev, open: false }))}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#f3f4f6] text-[#374151] dark:bg-[#374151] dark:text-[#f3f4f6]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-nav-border-active"
            >
              {isEdit ? "Save Changes" : "Create Attribute"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
