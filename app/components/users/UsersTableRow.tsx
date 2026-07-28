import { format } from "date-fns";
import { languageLocaleMap } from "~/components/position-details/PositionHeader";
import i18n from "~/config/i18n";
import defaultUser from "/image.png";
import Admin from "~/utils/roles/Admin";
import Candidate from "~/utils/roles/Candidate";
import Recruiter from "~/utils/roles/Recruiter";
import GoogleProvider from "~/utils/providers/GoogleProvider";
import GitHubProvider from "~/utils/providers/GitHubProvider";
import Active from "~/utils/statuses/Active";
import Blocked from "~/utils/statuses/Blocked";
import { Provider } from "~/types/Role";
import type { SelectedUser, User } from "~/types/User";
import { Checkbox } from "../ui/checkbox";
import { useTranslation } from "react-i18next";

export default function UsersTableRow({
  user,
  selectedUsers,
  setSelectedUsers,
}: {
  user: User;
  selectedUsers: SelectedUser[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<SelectedUser[]>>;
}) {
  const { t } = useTranslation();
  return (
    <tr className="text-xs border-b border-table-border last:border-0">
      <td className="pl-4 py-2.5">
        <div className="flex items-center gap-2">
          <Checkbox
            onCheckedChange={(checked) => {
              setSelectedUsers((prev) =>
                checked
                  ? [...prev, { id: user.id, updatedAt: user.updatedAt }]
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
      <td className="px-4 py-2.5 truncate text-nav-text">{user.email}</td>
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
  );
}
