import blockUsers from "~/api/blockUsers";
import assignRoles from "~/api/assignRoles";
import { Role } from "~/types/Role";
import type { SelectedUser } from "~/types/User";
import { Ban, LockOpen } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { useTranslation } from "react-i18next";

export default function BulkOperationToolbar({
  selectedUsers,
  setSelectedUsers,
  executeAction,
}: {
  selectedUsers: SelectedUser[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<SelectedUser[]>>;
  executeAction: (action: () => Promise<string>) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="mx-6 mb-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
      <div className="flex items-center gap-2 mr-2">
        <Checkbox
          checked={selectedUsers.length > 0}
          className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
        />
        <span className="text-xs font-semibold text-white">
          {selectedUsers.length} {t("page.user.selected")}
        </span>
      </div>
      <hr className="w-px mx-1 h-5 bg-hr" />
      <span className="text-xs dark:text-[#ffffff99] text-[#9ca3af]">
        {t("page.user.changeRole")}:{" "}
      </span>
      <button
        disabled={selectedUsers.length === 0}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
        onClick={() =>
          executeAction(() => assignRoles(selectedUsers, Role.CANDIDATE))
        }
      >
        {t("page.user.makeCandidate")}
      </button>
      <button
        disabled={selectedUsers.length === 0}
        onClick={() =>
          executeAction(() => assignRoles(selectedUsers, Role.RECRUITER))
        }
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
      >
        {t("page.user.makeRecruiter")}
      </button>
      <button
        disabled={selectedUsers.length === 0}
        onClick={() =>
          executeAction(() => assignRoles(selectedUsers, Role.ADMIN))
        }
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
      >
        {t("page.user.makeAdmin")}
      </button>
      <hr className="w-px mx-1 h-5 bg-hr" />
      <button
        disabled={selectedUsers.length === 0}
        onClick={() => executeAction(() => blockUsers(selectedUsers, true))}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-[#ef4444]"
      >
        <Ban className="w-3 h-3" />
        {t("page.user.block")}
      </button>
      <button
        disabled={selectedUsers.length === 0}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
        onClick={() => executeAction(() => blockUsers(selectedUsers, false))}
      >
        <LockOpen className="w-3 h-3" />
      </button>
    </div>
  );
}
