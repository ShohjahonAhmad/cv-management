import getAttributes, {
  createAttribute,
  updateAttribute,
} from "~/api/getAttributes";
import { useActionData, useLoaderData, useRevalidator } from "react-router";
import { type Dialog, type SelectedAttribute } from "~/types/Attribute";
import Pagination from "~/components/Pagination";
import type { Route } from "./+types/attributes";
import { useEffect, useState } from "react";
import AttributeDialog from "~/components/attrs/AttributeDialog";
import {
  CreateAttributeSchema,
  UpdateAttributeSchema,
  type AttributeOption,
} from "~/schemas";
import { useTranslation } from "react-i18next";
import { buildErrors } from "~/utils/buildErrors";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import { toast } from "sonner";
import { Role } from "~/types/Role";
import { requireRoles } from "~/utils/requireRoles";
import AttributeHeader from "~/components/attrs/AttributeHeader";
import AttributeFilter from "~/components/attrs/AttributeFilter";
import AttributeActionBar from "~/components/attrs/AttributeActionBar";
import getAttributeOptions from "~/utils/getAttributeOptions";
import AttributeTable from "~/components/attrs/AttributeTable";

export async function clientLoader({ url }: Route.ClientLoaderArgs) {
  const role = localStorage.getItem("role") as Role;
  requireRoles(role, [Role.ADMIN, Role.RECRUITER]);

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
  const { page, setPage } = useCustomSearchParams();
  const [selected, setSelected] = useState<SelectedAttribute[]>([]);
  const { revalidate } = useRevalidator();
  const [dialog, setDialog] = useState<Dialog>({ open: false, mode: "create" });
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
    setSelected([]);
  }, [attributes]);

  return (
    <main>
      <AttributeHeader setDialog={setDialog} total={total} />
      <AttributeFilter length={attributes.length} total={total} />
      <AttributeActionBar
        setDialog={setDialog}
        selected={selected}
        attributes={attributes}
      />
      <AttributeTable
        attributes={attributes}
        selected={selected}
        setSelected={setSelected}
      />
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
