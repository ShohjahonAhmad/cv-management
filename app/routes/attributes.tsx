import { Funnel, Library, Plus, SquarePen, Trash2, X } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import getAttributes, {
  createAttribute,
  deleteAttribute,
  updateAttribute,
} from "~/api/getAttributes";
import {
  useActionData,
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from "react-router";
import { AttributeTypeC } from "~/components/AttributeTypeC";
import {
  type Attribute,
  type Dialog,
  type SelectedAttribute,
} from "~/types/Attribute";
import AttributeCategoryC from "~/components/AttributeCategoryC";
import Pagination from "~/components/Pagination";
import type { Route } from "./+types/attributes";
import { useEffect, useState } from "react";
import AttributeDialog, {
  attributeCategoryLabels,
} from "~/components/AttributeDialog";
import {
  CreateAttributeSchema,
  UpdateAttributeSchema,
  type AttributeOption,
} from "~/schemas";
import { useTranslation } from "react-i18next";
import { buildErrors } from "~/utils/buildErrors";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import { toast } from "sonner";

export async function clientLoader({ url }: Route.ClientLoaderArgs) {
  const searchParams = new URL(url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const attributes = await getAttributes(page, search, filter);

  return attributes;
}

async function create(formData: FormData, attributeOptions: AttributeOption[]) {
  const form = {
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    type: formData.get("type"),
    attributeOptions:
      attributeOptions.length > 0 ? attributeOptions : undefined,
  };
  const result = CreateAttributeSchema.safeParse(form);

  if (!result.success) {
    return {
      error: true,
      errors: buildErrors(result.error),
    };
  }
  const data = await createAttribute(result.data);
  return data;
}

async function edit(formData: FormData, attributeOptions: AttributeOption[]) {
  const form = {
    id: Number(formData.get("id")),
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    type: formData.get("type"),
    updatedAt: formData.get("updatedAt"),
    attributeOptions:
      attributeOptions.length > 0 ? attributeOptions : undefined,
  };
  const result = UpdateAttributeSchema.safeParse(form);
  if (!result.success) {
    return {
      error: true,
      errors: buildErrors(result.error),
    };
  }
  const data = await updateAttribute(result.data);
  return data;
}

function getAttributeOptions(formData: FormData): AttributeOption[] {
  const attributeOptions: AttributeOption[] = [];

  for (let i = 0; ; i++) {
    const value = formData.get(`attributeOptions[${i}].value`);

    if (value === null) break;

    const id = formData.get(`attributeOptions[${i}].id`);

    attributeOptions.push({
      ...(id && { id: Number(id) }),
      value: String(value),
    });
  }

  return attributeOptions;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const mode = formData.get("mode");

  const attributeOptions = getAttributeOptions(formData);

  if (mode === "create") {
    return await create(formData, attributeOptions);
  } else {
    return await edit(formData, attributeOptions);
  }
}

type ActionData = {
  success: boolean;
  message: string;
  conflict?: boolean;
  error?: boolean;
  errors?: string[];
};

export default function Attributes() {
  const { attributes, total, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    page,
    setPage,
    setSearch: setSearchParam,
    search: searchParam,
  } = useCustomSearchParams();
  const [selected, setSelected] = useState<SelectedAttribute[]>([]);
  const { revalidate } = useRevalidator();
  const [dialog, setDialog] = useState<Dialog>({ open: false, mode: "create" });
  const [search, setSearch] = useState<string>(searchParam ?? "");
  const selectedAttribute = attributes.find(
    (a: Attribute) => a.id === selected[0]?.id
  );
  const actionData = useActionData<ActionData>();
  const { t } = useTranslation();

  useEffect(() => {
    if (!actionData) return;

    if (actionData.conflict) {
      revalidate();
      setDialog({ open: false, mode: "create" });
      toast.warning(actionData.message);
      return;
    }

    if (actionData.error) {
      toast.error(actionData.message);
      return;
    }

    revalidate();
    setDialog({ open: false, mode: "create" });
    setSelected([]);
    toast.success(actionData.message);
  }, [actionData]);

  useEffect(() => {
    const delayedParam = setTimeout(() => {
      setSearchParam(search);
    }, 400);

    return () => clearTimeout(delayedParam);
  }, [search]);

  useEffect(() => {
    setSelected([]);
  }, [attributes]);

  function buildMessage(
    conflicts: number,
    changeCount: number,
    count: number
  ): string {
    if (conflicts > 0) {
      return t("page.attribute.toast.conflict", { conflicts, changeCount });
    } else if (count > 0) {
      return t("page.attribute.toast.changesSaved", { count });
    } else {
      return t("page.attribute.toast.noChanges");
    }
  }

  return (
    <main>
      <div className="px-6 py-5 flex items-center gap-4 flex-col lg:flex-row justify-between">
        <div>
          <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
            {t("page.attribute.title")}
          </h1>
          <p className="text-xs text-nav-text mt-0.5">
            {t("page.attribute.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
            <Library className="w-3.5 h-3.5 text-nav-text" />
            <span className="font-medium text-xs text-hr">
              {total} {t("page.attribute.attributes")}
            </span>
          </div>
          <button
            onClick={() => setDialog({ open: true, mode: "create" })}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-nav-border-active text-white cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t("page.attribute.newAttribute")}
          </button>
        </div>
      </div>
      <div className="px-6 py-3 flex flex-wrap justify-between items-center gap-3 border-y border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("page.attribute.searchPlaceholder")}
            className="text-xs text-date px-3 py-2 rounded-lg bg-table-header border border-table-border w-full sm:min-w-65"
          />
          <select
            name="filter"
            id="filter"
            value={searchParams.get("filter") || "all"}
            onChange={(e) =>
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                if (e.target.value === "all") {
                  params.delete("filter");
                } else {
                  params.set("filter", e.target.value);
                }
                params.set("page", "1");
                return params;
              })
            }
            className="border mt-1.5 border-table-border rounded-lg px-3 py-2 bg-table-header text-xs lg:ml-3"
          >
            <option value="all">{t("page.attribute.allCategories")}</option>
            {Object.entries(attributeCategoryLabels).map(([type, label]) => (
              <option key={type} value={type}>
                {t(label)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-date">
          <Funnel className="w-3 h-3" />
          <span>
            {t("page.attribute.show", { attributes: attributes.length, total })}
          </span>
        </div>
      </div>
      <div className="mx-6 my-3 flex flex-wrap items-center gap-x-2 gap-y-3 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
        <div className="flex items-center gap-2 mr-2">
          <Checkbox
            checked={true}
            className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          />
          <span className="text-xs font-semibold text-white">
            {selected.length} {t("page.attribute.selected")}
          </span>
        </div>
        <hr className="w-px mx-1 h-5 bg-hr hidden lg:block" />
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-date bg-hr cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          disabled={selected.length !== 1}
          onClick={() =>
            setDialog({
              open: true,
              mode: "edit",
              attribute: selectedAttribute,
            })
          }
        >
          <SquarePen className="w-3.5 h-3.5" />
          <span>{t("page.attribute.edit")}</span>
          <span className="ml-1 px-1.5 py-0.5 rounded text-xs bg-[#1f2937] dark:bg-indigo-300 text-nav-text text-[10px]">
            {t("page.attribute.singleSelection")}
          </span>
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#dc2626] text-white cursor-pointer"
          disabled={selected.length === 0}
          onClick={async () => {
            const { conflicts, changeCount, count } =
              await deleteAttribute(selected);
            const message = buildMessage(conflicts, changeCount, count);
            if (conflicts > 0) {
              toast.warning(message);
            } else {
              toast.success(message);
            }
            revalidate();
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t("page.attribute.delete")}</span>
        </button>
      </div>
      <div className="mx-2 lg:mx-6 mt-2 rounded-xl overflow-x-auto border border-table-border">
        <table className="w-full table-fixed min-w-225">
          <thead>
            <tr className="uppercase bg-table-header border-b text-xs font-semibold tracking-[0.06em] text-nav-text text-left">
              <th className="px-4 py-2.5 w-[3%]">
                <Checkbox
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelected(
                        attributes.map((attribute: Attribute) => ({
                          id: attribute.id,
                          updatedAt: attribute.updatedAt,
                        }))
                      );
                    } else {
                      setSelected([]);
                    }
                  }}
                  checked={
                    selected.length === 0
                      ? false
                      : selected.length === attributes.length
                        ? true
                        : "indeterminate"
                  }
                  className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
              </th>
              <th className="px-4 py-2.5 w-[32%]">
                {t("page.attribute.table.name")}
              </th>
              <th className="px-4 py-2.5 w-[17%]">
                {t("page.attribute.table.category")}
              </th>
              <th className="px-4 py-2.5 w-[12%]">
                {t("page.attribute.table.type")}
              </th>
              <th className="px-4 py-2.5 w-[24%]">
                {t("page.attribute.table.description")}
              </th>
              <th className="px-4 py-2.5 w-[12%]">
                {t("page.attribute.table.created")}
              </th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute: Attribute) => (
              <tr
                className="text-xs border-b border-table-border last:border-0"
                key={attribute.id}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        setSelected((prev) => {
                          if (checked) {
                            return [
                              ...prev,
                              {
                                id: attribute.id,
                                updatedAt: attribute.updatedAt,
                              },
                            ];
                          } else {
                            return prev.filter((s) => s.id !== attribute.id);
                          }
                        });
                      }}
                      checked={selected.some((s) => s.id === attribute.id)}
                      className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                  </div>
                </td>
                <td className="px-4 py-2.5 font-medium text-sm text-nav-text-active">
                  {attribute.name}
                </td>
                <td className="px-4 py-2.5 truncate text-nav-text">
                  <AttributeCategoryC category={attribute.category} />
                </td>
                <td className="px-4 py-2.5">
                  <AttributeTypeC type={attribute.type} />
                </td>
                <td className="px-4 py-2.5">
                  <div className="truncate">{attribute.description}</div>
                </td>
                <td className="px-4 py-2.5">
                  {attribute.createdAt
                    ? format(new Date(attribute.createdAt), "dd MMM, yyyy", {
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
        <AttributeDialog
          mode={dialog.mode}
          setDialog={setDialog}
          attribute={dialog.attribute}
          errors={actionData?.error ? actionData.errors : undefined}
        />
      )}
    </main>
  );
}
