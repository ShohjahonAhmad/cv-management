import { t } from "i18next";
import { useState } from "react";
import { Form } from "react-router";
import TagMultiSelect from "./TagInput";
import { Minus, Plus, X } from "lucide-react";
import { PositionLevel, type Dialog, type Position } from "~/types/Position";
import AttributeMultiSelect from "./AttributeMultiSelect";
import ErrorBanner from "./ErrorBanner";

export const positionLevelLabels: Record<PositionLevel, string> = {
  [PositionLevel.INTERN]: "positionLevel.intern",
  [PositionLevel.JUNIOR]: "positionLevel.junior",
  [PositionLevel.MIDDLE]: "positionLevel.middle",
  [PositionLevel.SENIOR]: "positionLevel.senior",
  [PositionLevel.LEAD]: "positionLevel.lead",
  [PositionLevel.MANAGER]: "positionLevel.manager",
  [PositionLevel.DIRECTOR]: "positionLevel.director",
  [PositionLevel.VP]: "positionLevel.vp",
  [PositionLevel.C_LEVEL]: "positionLevel.c_level",
};

type PositionDialogProps = {
  mode: "create" | "edit";
  position?: Position;
  setDialog: React.Dispatch<React.SetStateAction<Dialog>>;
  errors: string[] | undefined;
};

export default function PositionDialog({
  mode,
  position,
  setDialog,
  errors,
}: PositionDialogProps) {
  const [maxProjects, setMaxProjects] = useState(position?.maxProjects || 1);
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-[#00000059]">
      <div className="flex flex-col rounded-2xl w-[560px] bg-table-header border border-table-border shadow-2xl">
        <div className="flex items-start justify-between px-6 py-5">
          <div>
            <h1 className="font-bold text-base text-nav-text-active">
              {isEdit
                ? t("page.position.dialog.edit.title")
                : t("page.position.dialog.create.title")}
            </h1>
            <p className="text-xs text-nav-text mt-1">
              {isEdit
                ? t("page.position.dialog.edit.subtitle")
                : t("page.position.dialog.create.subtitle")}
            </p>
          </div>
          <button
            onClick={() => setDialog({ open: false, mode: "create" })}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-hr"
          >
            <X className="w-3.5 h-3.5 text-nav-text" />
          </button>
        </div>
        {errors && errors.length > 0 && <ErrorBanner errors={errors} />}
        <Form method="POST" className="px-6 py-5 flex flex-col gap-1.5">
          <input type="hidden" name="mode" value={mode} />
          {isEdit && (
            <>
              <input type="hidden" name="id" value={position?.id} />
              <input
                type="hidden"
                name="updatedAt"
                value={position?.updatedAt}
              />
            </>
          )}
          <label htmlFor="title" className="text-xs font-medium text-hr">
            {t("page.position.dialog.create.title")}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={position?.title}
            placeholder={t("page.position.dialog.titlePlaceholder")}
            className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
          />
          <label htmlFor="description" className="text-xs font-medium text-hr">
            {t("page.position.dialog.description")}
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={position?.description}
            className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
            placeholder={t("page.position.dialog.descriptionPlaceholder")}
          ></textarea>
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="company" className="text-xs font-medium text-hr">
                {t("page.position.dialog.company")}
              </label>
              <input
                type="text"
                name="company"
                id="company"
                defaultValue={position?.company}
                placeholder={t("page.position.dialog.companyPlaceholder")}
                className="border border-table-border rounded-lg px-3 py-2.5 bg-table-header text-sm text-date"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="level" className="text-xs font-medium text-hr">
                {t("page.position.dialog.level")}
              </label>
              <select
                name="level"
                id="level"
                defaultValue={position?.level || PositionLevel.INTERN}
                className="border mt-1.5 border-table-border rounded-lg px-3 py-2.5 bg-table-header disabled:opacity-50"
              >
                {Object.entries(positionLevelLabels).map(([level, label]) => (
                  <option value={level} key={level}>
                    {t(label)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <TagMultiSelect tags={position?.positionProjectTags} />
          <AttributeMultiSelect attributes={position?.positionAttributes} />
          <label
            htmlFor="maxProjects"
            className="text-xs text-hr font-medium mt-1.5"
          >
            {t("page.position.dialog.maxProjects")}
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg overflow-hidden border border-table-border">
              <button
                disabled={maxProjects <= 1}
                type="button"
                onClick={() => setMaxProjects((prev) => prev - 1)}
                className="flex items-center justify-center w-9 h-9 bg-table-header cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <div className="w-12 font-sm font-semibold text-nav-text-active py-2 text-center border-x border-table-border">
                {maxProjects}
              </div>
              <button
                disabled={maxProjects >= 10}
                type="button"
                onClick={() => setMaxProjects((prev) => prev + 1)}
                className="flex items-center justify-center w-9 h-9 bg-table-header cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-date">
              {t("page.position.dialog.minValue")}
            </p>
            <input name="maxProjects" hidden readOnly value={maxProjects} />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setDialog({ open: false, mode: "create" })}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#f3f4f6] text-[#374151] dark:bg-[#374151] dark:text-[#f3f4f6] cursor-pointer"
            >
              {t("page.position.dialog.cancel")}
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-nav-border-active cursor-pointer">
              {isEdit
                ? t("page.position.dialog.edit.action")
                : t("page.position.dialog.create.action")}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
