import { useTranslation } from "react-i18next";
import type { Route } from "./+types/positions";
import {
  getPositions,
  createPosition,
  updatePosition,
} from "~/api/getPositions";
import { useActionData, useLoaderData, useRevalidator } from "react-router";
import type { CreatePosition, SelectedPosition } from "~/types/Position";
import { useEffect, useState } from "react";
import Pagination from "~/components/Pagination";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import PositionDialog from "~/components/PositionDialog";
import { CreatePositionSchema, UpdatePositionSchema } from "~/schemas";
import { buildErrors } from "~/utils/buildErrors";
import type { Dialog } from "~/types/Position";
import { toast } from "sonner";
import { Role } from "~/types/Role";
import { requireRoles } from "~/utils/requireRoles";
import PositionsHeader from "~/components/positions/PositionsHeader";
import PositionsSearch from "~/components/positions/PositionsSearch";
import PositionsActionBar from "~/components/positions/PositionsActionBar";
import PositionsTable from "~/components/positions/PositionsTable";

async function create(formData: FormData) {
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
}

async function edit(formData: FormData) {
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

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const mode = formData.get("mode") as "create" | "edit";
  switch (mode) {
    case "create":
      return await create(formData);
    case "edit":
      return await edit(formData);
  }
}

export async function clientLoader({ url }: Route.ClientLoaderArgs) {
  const role = localStorage.getItem("role") as Role;
  requireRoles(role, [Role.ADMIN, Role.RECRUITER]);
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
  const [selected, setSelected] = useState<SelectedPosition[]>([]);
  const { page, setPage } = useCustomSearchParams();
  const actionData = useActionData();
  const [dialog, setDialog] = useState<Dialog>({ open: false, mode: "create" });

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

  return (
    <main>
      <PositionsHeader
        setDialog={setDialog}
        page={page}
        total={total}
        totalPages={totalPages}
      />
      <PositionsSearch
        total={total}
        pageSize={Math.min(pageSize, positions.length)}
      />

      <PositionsActionBar
        selected={selected}
        positions={positions}
        setDialog={setDialog}
      />
      <PositionsTable
        selected={selected}
        setSelected={setSelected}
        positions={positions}
      />
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
