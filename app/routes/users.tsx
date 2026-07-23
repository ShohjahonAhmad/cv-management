import Admin from "~/utils/roles/Admin";
import Candidate from "~/utils/roles/Candidate";
import Recruiter from "~/utils/roles/Recruiter";
import GoogleProvider from "~/utils/providers/GoogleProvider";
import GitHubProvider from "~/utils/providers/GitHubProvider";
import Active from "~/utils/statuses/Active";
import Blocked from "~/utils/statuses/Blocked";
import getUsers from "~/api/getUsers";
import { useLoaderData, useSearchParams, useRevalidator } from "react-router";
import type { Route } from "./+types/users";
import defaultUser from "../../public/image.png";
import { useEffect, useState } from "react";
import { Provider } from "~/types/Role";
import type { SelectedUser, User } from "~/types/User";
import { Checkbox } from "~/components/ui/checkbox";
import BulkOperationToolbar from "~/components/BulkOperationToolbar";
import Pagination from "~/components/Pagination";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import useCustomSearchParams from "~/hooks/useCustomSearchParam";
import { toast } from "sonner";
import type { AssignRolesResponse } from "~/api/assignRoles";
import type { BlockUsersResponse } from "~/api/blockUsers";

export async function clientLoader({ url }: Route.LoaderArgs) {
  const searchParams = new URL(url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const users = await getUsers(page);
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
  }, [page]);

  function showActionToast(result: AssignRolesResponse | BlockUsersResponse) {
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
        toast.success(
          result.conflicts === 0
            ? t("page.user.toast.allRoleChanged", {
                count: result.count,
                role: result.role,
              })
            : t("page.user.toast.partialRoleChanged", {
                changeCount: result.changeCount,
                conflicts: result.conflicts,
                role: result.role,
              })
        );
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
      <div className="px-2 lg:px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
            {t("page.user.title")}
          </h1>
          <p className="text-xs text-nav-text mt-0.5">
            {t("page.user.subtitle")}
          </p>
        </div>

        <span className="text-xs text-nav-text">
          {total} {t("page.user.users")} · {t("page.user.page")}
          <strong className="mx-1 text-nav-text-active">{page}</strong>
          {t("page.user.of")} {totalPages}
        </span>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 flex flex-col min-w-0">
          <BulkOperationToolbar
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            executeAction={executeAction}
          />
        </div>
      </div>
      <div className="mx-1 lg:mx-6 overflow-x-auto rounded-xl border border-table-border">
        <table className="w-full table-fixed min-w-225">
          <thead>
            <tr className="uppercase bg-table-header border-b text-xs font-semibold tracking-[0.06em] text-nav-text text-left">
              <th className="pl-4 py-2.5 w-[5%]">
                <Checkbox
                  onCheckedChange={() =>
                    setSelectedUsers((prev) =>
                      prev.length === users.length
                        ? []
                        : users.map((user: User) => ({
                            id: user.id,
                            updatedAt: user.updatedAt,
                          }))
                    )
                  }
                  checked={
                    selectedUsers.length === 0
                      ? false
                      : selectedUsers.length === users.length
                        ? true
                        : "indeterminate"
                  }
                  className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
              </th>
              <th className="px-2 py-2.5 w-[30%]">
                {t("page.user.table.user")}
              </th>
              <th className="px-4 py-2.5 w-[17%]">
                {t("page.user.table.email")}
              </th>
              <th className="px-4 py-2.5 w-[12%]">
                {t("page.user.table.provider")}
              </th>
              <th className="px-4 py-2.5 w-[12%]">
                {t("page.user.table.role")}
              </th>
              <th className="px-4 py-2.5 w-[12%]">
                {t("page.user.table.status")}
              </th>
              <th className="px-4 py-2.5 w-[12%]">
                {t("page.user.table.created")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr className="text-xs" key={user.id}>
                <td className="pl-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        setSelectedUsers((prev) =>
                          checked
                            ? [
                                ...prev,
                                { id: user.id, updatedAt: user.updatedAt },
                              ]
                            : prev.filter((u) => u.id !== user.id)
                        );
                      }}
                      checked={selectedUsers.some((u) => u.id === user.id)}
                      className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                  </div>
                </td>
                <td className="px-2 py-2.5 font-medium text-sm text-nav-text-active">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photoUrl ?? defaultUser}
                      className="h-10 w-10 rounded-full object-fit"
                    />

                    <span className="font-medium text-sm text-nav-text-active">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 truncate text-nav-text">
                  {user.email}
                </td>
                <td className="px-4 py-2.5">
                  {user.provider === Provider.GITHUB ? (
                    <GitHubProvider />
                  ) : (
                    <GoogleProvider />
                  )}
                </td>
                <td className="px-4 py-2.5">
                  {user.role === "ADMIN" ? (
                    <Admin />
                  ) : user.role === "RECRUITER" ? (
                    <Recruiter />
                  ) : (
                    <Candidate />
                  )}
                </td>
                <td className="px-4 py-2.5">
                  {user.isBlocked ? <Blocked /> : <Active />}
                </td>
                <td className="px-4 py-2.5 text-date">
                  {user.createdAt
                    ? format(new Date(user.createdAt), "dd MMM, yyyy", {
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
    </main>
  );
}
