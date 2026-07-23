import {
  BookOpen,
  FolderOpen,
  Funnel,
  Plus,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "~/components/ui/checkbox";
import AttributeCount from "~/utils/attribute_types/AttributeCount";
import PositionLevel from "~/utils/attribute_types/ProjectCount";
import Tag from "~/utils/attribute_types/Tag";
import type { Route } from "./+types/positions";
import {
  deletePositions,
  getPositions,
  createPosition,
  updatePosition,
} from "~/api/getPositions";
import { useActionData, useLoaderData, useRevalidator } from "react-router";
import type { CreatePosition, Position } from "~/types/Position";
import { useEffect, useState } from "react";
import Pagination from "~/components/Pagination";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import PositionDialog from "~/components/PositionDialog";
import { CreatePositionSchema, UpdatePositionSchema } from "~/schemas";
import { buildErrors } from "~/utils/buildErrors";
import type { Dialog } from "~/types/Position";
import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import { toast } from "sonner";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const mode = formData.get("mode") as "create" | "edit";
  if (mode === "create") {
    const position = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      company: formData.get("company") as string,
      level: formData.get("level") as string as CreatePosition["level"],
      maxProjects: Number(formData.get("maxProjects")),
      attributeIds: formData.getAll("attributeIds") as string[],
      tags: formData.getAll("tags") as string[],
    };

    const result = CreatePositionSchema.safeParse(position);

    if (!result.success) {
      return {
        error: true,
        errors: buildErrors(result.error),
      };
    }

    const data = await createPosition(result.data);

    return data;
  } else {
    const position = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      company: formData.get("company") as string,
      level: formData.get("level") as string as CreatePosition["level"],
      maxProjects: Number(formData.get("maxProjects")),
      attributeIds: formData.getAll("attributeIds") as string[],
      tags: formData.getAll("tags") as string[],
      updatedAt: formData.get("updatedAt") as string,
    };

    const result = UpdatePositionSchema.safeParse(position);

    if (!result.success) {
      return {
        error: true,
        errors: buildErrors(result.error),
      };
    }
    const id = formData.get("id") as string;
    const data = await updatePosition({ ...result.data, id });

    return data;
  }
}

export async function clientLoader({ url }: Route.ClientLoaderArgs) {
  const searchParams = new URL(url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const positions = await getPositions(page, search);

  return positions;
}

export default function Positions() {
  const { revalidate } = useRevalidator();
  const { t } = useTranslation();
  const { positions, total, pageSize, totalPages } = useLoaderData();
  const [selected, setSelected] = useState<{ id: number; updatedAt: string }[]>(
    []
  );
  const {
    page,
    setPage,
    search: paramSearch,
    setSearch: setParamSearch,
  } = useCustomSearchParams();
  const [search, setSearch] = useState(paramSearch);
  const actionData = useActionData();
  const [dialog, setDialog] = useState<Dialog>({ open: false, mode: "create" });
  const selectedPosition = positions.find(
    (p: Position) => p.id === selected[0]?.id
  );

  useEffect(() => {
    const delayedParam = setTimeout(() => {
      setParamSearch(search);
    }, 400);

    return () => clearTimeout(delayedParam);
  }, [search]);

  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      toast.success(
        actionData.update
          ? t("page.position.toast.positionUpdated")
          : t("page.position.toast.positionCreated")
      );
      setDialog({ open: false, mode: "create" });
      revalidate();
    } else if (!actionData.success && actionData.conflict) {
      toast.error(t("page.position.toast.conflictError"));
      setDialog({ open: false, mode: "create" });
      revalidate();
    } else {
      toast.error(actionData.message);
    }
  }, [actionData]);

  useEffect(() => {
    setSelected([]);
  }, [positions]);

  function buildMessage(
    conflicts: number,
    changeCount: number,
    count: number
  ): string {
    if (conflicts > 0) {
      return t("page.position.toast.conflict", { conflicts, changeCount });
    } else if (count > 0) {
      return t("page.position.toast.changesSaved", { count });
    } else {
      return t("page.position.toast.noChanges");
    }
  }

  async function handleDelete() {
    const { conflicts, changeCount, count } = await deletePositions(selected);
    const message = buildMessage(conflicts, changeCount, count);
    if (conflicts > 0) {
      toast.warning(message);
    } else {
      toast.success(message);
    }
    revalidate();
  }
  return (
    <main>
      <div className="px-6 py-5 flex items-start flex-col gap-2 lg:flex-row justify-between">
        <div>
          <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
            {t("page.position.title")}
          </h1>
          <p className="text-xs text-nav-text mt-0.5 max-w-130">
            {t("page.position.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
            <FolderOpen className="w-3.5 h-3.5 text-date" />
            <span className="text-xs font-medium text-hr">
              {total} {t("page.position.positions")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
            <BookOpen className="w-3.5 h-3.5 text-date" />
            <span className="text-xs font-medium text-hr">
              {t("page.position.page", { page, totalPages })}
            </span>
          </div>
          <button
            onClick={() => setDialog({ open: true, mode: "create" })}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-nav-border-active text-white cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t("page.position.newPosition")}
          </button>
        </div>
      </div>
      <div className="px-6 py-3 flex-wrap flex justify-between items-center gap-3 border-y border-border">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("page.position.searchPlaceholder")}
            className="text-xs text-date px-3 py-2 rounded-lg bg-table-header border border-table-border min-w-65"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-date">
          <Funnel className="w-3 h-3" />
          <span>
            {t("page.position.show", {
              pageSize: Math.min(pageSize, positions.length),
              total,
            })}
          </span>
        </div>
      </div>

      <div className="mx-2 lg:mx-6 flex-wrap my-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
        <div className="flex items-center gap-2 mr-2">
          <Checkbox
            checked={
              selected.length === 0
                ? false
                : selected.length === positions.length
                  ? true
                  : "indeterminate"
            }
            className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          />
          <span className="text-xs font-semibold text-white">
            {selected.length} {t("page.position.selected")}
          </span>
        </div>
        <hr className="w-px mx-1 h-5 bg-hr hidden lg:block" />
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-date bg-hr cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          disabled={selected.length !== 1}
          onClick={() => {
            setDialog({
              open: true,
              mode: "edit",
              position: selectedPosition,
            });
          }}
        >
          <SquarePen className="w-3.5 h-3.5" />
          <span>{t("page.position.edit")}</span>
          <span className="ml-1 px-1.5 py-0.5 rounded text-xs bg-[#1f2937] dark:bg-indigo-300 text-nav-text text-[10px]">
            {t("page.position.singleSelection")}
          </span>
        </button>
        <hr className="w-px mx-1 h-5 bg-hr hidden lg:block" />
        <button
          disabled={selected.length === 0}
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#dc2626] text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t("page.position.delete")}</span>
        </button>
      </div>
      <div className="mx-2 lg:mx-6 mt-2 rounded-xl overflow-x-auto border border-table-border">
        <table className="w-full table-fixed min-w-225">
          <thead>
            <tr className="uppercase bg-table-header border-b text-xs font-semibold tracking-[0.06em] text-nav-text text-left">
              <th className="px-4 py-2.5 w-[3%]">
                <Checkbox
                  className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelected(
                        positions.map((position: Position) => ({
                          id: position.id,
                          updatedAt: position.updatedAt,
                        }))
                      );
                    } else {
                      setSelected([]);
                    }
                  }}
                  checked={
                    selected.length === 0
                      ? false
                      : selected.length === positions.length
                        ? true
                        : "indeterminate"
                  }
                />
              </th>
              <th className="px-4 py-2.5 w-[24%]">
                {t("page.position.table.title")}
              </th>
              <th className="px-4 py-2.5 truncate w-[25%]">
                {t("page.position.table.description")}
              </th>
              <th className="px-4 py-2.5 w-[11%]">
                {t("page.position.table.attributes")}
              </th>
              <th className="px-4 py-2.5 w-[11%]">
                {t("page.position.table.tags")}
              </th>
              <th className="px-4 py-2.5 w-[11%]">
                {t("page.position.table.maxProjects")}
              </th>
              <th className="px-4 py-2.5 w-[15%]">
                {t("page.position.table.created")}
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position: Position) => (
              <tr
                className="text-xs border-b border-table-border last:border-0"
                key={position.id}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      checked={selected.some((s) => s.id === position.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelected((prev) => {
                            if (prev.some((s) => s.id === position.id))
                              return prev;

                            return [
                              ...prev,
                              {
                                id: position.id,
                                updatedAt: position.updatedAt,
                              },
                            ];
                          });
                        } else {
                          setSelected((prev) =>
                            prev.filter((s) => s.id !== position.id)
                          );
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
                  <div className="truncate text-nav-text">
                    {position.description}
                  </div>
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
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      {dialog.open && (
        <PositionDialog
          mode={dialog.mode}
          setDialog={setDialog}
          errors={actionData?.error ? actionData.errors : undefined}
          position={dialog.position}
        />
      )}
    </main>
  );
}
