import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import type { SelectedUser, User } from "~/types/User";
import UsersTableRow from "./UsersTableRow";

export default function UsersTable({
  setSelectedUsers,
  users,
  selectedUsers,
}: {
  setSelectedUsers: React.Dispatch<React.SetStateAction<SelectedUser[]>>;
  users: User[];
  selectedUsers: SelectedUser[];
}) {
  const { t } = useTranslation();
  return (
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
            <th className="px-2 py-2.5 w-[30%]">{t("page.user.table.user")}</th>
            <th className="px-4 py-2.5 w-[17%]">
              {t("page.user.table.email")}
            </th>
            <th className="px-4 py-2.5 w-[12%]">
              {t("page.user.table.provider")}
            </th>
            <th className="px-4 py-2.5 w-[12%]">{t("page.user.table.role")}</th>
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
            <UsersTableRow
              key={user.id}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
