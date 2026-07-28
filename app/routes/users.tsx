import getUsers from "~/api/getUsers";
import { useLoaderData, useRevalidator } from "react-router";
import type { Route } from "./+types/users";
import { useEffect, useState } from "react";
import { Role } from "~/types/Role";
import type { SelectedUser } from "~/types/User";
import BulkOperationToolbar from "~/components/BulkOperationToolbar";
import Pagination from "~/components/Pagination";
import { useTranslation } from "react-i18next";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import { toast } from "sonner";
import type { AssignRolesResponse } from "~/api/assignRoles";
import type { BlockUsersResponse, DeleteUsersResponse } from "~/api/blockUsers";
import Search from "~/components/cvs/CVsSearch";
import { requireRoles } from "~/utils/requireRoles";
import UsersHeader from "~/components/users/UsersHeader";
import UsersTable from "~/components/users/UsersTable";

export async function clientLoader({ url }: Route.LoaderArgs) {
  const role = localStorage.getItem("role") as Role;
  requireRoles(role, [Role.ADMIN]);

  const searchParams = new URL(url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const users = await getUsers(page, search);
  return users;
}

export default function Users() {
  const { users, total, totalPages } = useLoaderData();
  const { page, setPage } = useCustomSearchParams();
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
  const { revalidate } = useRevalidator();
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedUsers([]);
  }, [page, users]);

  function showActionToast(
    result: AssignRolesResponse | BlockUsersResponse | DeleteUsersResponse
  ) {
    switch (result.action) {
      case "block":
        if (result.isBlocked) {
          if (result.conflicts === 0) {
            toast.success(
              t("page.user.toast.allBlocked", { count: result.count })
            );
          } else {
            toast.warning(
              t("page.user.toast.partialBlocked", {
                changeCount: result.changeCount,
                conflicts: result.conflicts,
              })
            );
          }
        } else {
          if (result.conflicts === 0) {
            toast.success(
              t("page.user.toast.allUnblocked", { count: result.count })
            );
          } else {
            toast.warning(
              t("page.user.toast.partialUnblocked", {
                changeCount: result.changeCount,
                conflicts: result.conflicts,
              })
            );
          }
        }
        break;

      case "assign":
        if (result.conflicts === 0) {
          toast.success(
            t("page.user.toast.allRoleChanged", {
              count: result.count,
              role: result.role,
            })
          );
        } else {
          toast.warning(
            t("page.user.toast.partialRoleChanged", {
              changeCount: result.changeCount,
              conflicts: result.conflicts,
              role: result.role,
            })
          );
        }
        break;

      case "delete":
        if (result.conflicts === 0) {
          toast.success(
            t("page.user.toast.allDeleted", {
              count: result.count,
            })
          );
        } else {
          toast.warning(
            t("page.user.toast.partialDeleted", {
              changeCount: result.changeCount,
              conflicts: result.conflicts,
            })
          );
        }
        break;
    }
  }

  async function executeAction(
    execute: () => Promise<AssignRolesResponse | BlockUsersResponse>
  ) {
    try {
      const result = await execute();

      showActionToast(result);
      revalidate();
      setSelectedUsers([]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("common.error"));
    }
  }

  return (
    <main className="flex flex-col max-h-screen w-full">
      <UsersHeader total={total} totalPages={totalPages} page={page} />
      <Search placeholder={t("page.user.searchPlaceholder")} />
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col min-w-0">
          <BulkOperationToolbar
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            executeAction={executeAction}
          />
        </div>
      </div>
      <UsersTable
        setSelectedUsers={setSelectedUsers}
        selectedUsers={selectedUsers}
        users={users}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
