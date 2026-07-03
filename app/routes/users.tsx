import { Checkbox } from "~/components/ui/checkbox";
import { Ban, ChevronLeft, ChevronRight, LockOpen } from "lucide-react";
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
import blockUsers from "~/api/blockUsers";
import assignRoles from "~/api/assignRoles";
import { Provider, Role } from "~/types/Role";
import type { SelectedUser, User } from "~/types/User";

export async function clientLoader({ url }: Route.LoaderArgs) {
  const searchParams = new URL(url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  console.log(localStorage.getItem("token"));
  const users = await getUsers(page);
  return users;
}

export default function Users() {
  const { users, total, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
  const { revalidate } = useRevalidator();
  const [message, setMessage] = useState<string | null>(null);

  function setPage(newPage: number) {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  }

  useEffect(() => {
    setSelectedUsers([]);
  }, [page]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  async function executeAction(action: () => Promise<string>) {
    setMessage(null);
    const message = await action();
    setMessage(message);
    revalidate();
    setSelectedUsers([]);
  }

  return (
    <main>
      {message && (
        <div className="absolute top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg z-50 border dark:bg-[#1a1a20] border-[#d1fae5] dark:border-[#1c3828]">
          <div>
            <p className="font-semibold text-sm text-nav-text-active">
              Changes saved
            </p>
            <p className="text-xs text-nav-text">{message}</p>
          </div>
        </div>
      )}
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
            User Management
          </h1>
          <p className="text-xs text-nav-text mt-0.5">
            Manage roles, permissions, and account status across all users
          </p>
        </div>

        <span className="text-xs text-nav-text">
          {total} users · Page
          <strong className="mx-1 text-nav-text-active">{page}</strong>
          of {totalPages}
        </span>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="mx-6 mb-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
            <div className="flex items-center gap-2 mr-2">
              <Checkbox
                checked={selectedUsers.length > 0}
                className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <span className="text-xs font-semibold text-white">
                {selectedUsers.length} selected
              </span>
            </div>
            <hr className="w-px mx-1 h-5 bg-hr" />
            <span className="text-xs dark:text-[#ffffff99] text-[#9ca3af]">
              Change Role:{" "}
            </span>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
              onClick={() =>
                executeAction(() => assignRoles(selectedUsers, Role.CANDIDATE))
              }
            >
              Make Candidate
            </button>
            <button
              onClick={() =>
                executeAction(() => assignRoles(selectedUsers, Role.RECRUITER))
              }
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
            >
              Make Recruiter
            </button>
            <button
              onClick={() =>
                executeAction(() => assignRoles(selectedUsers, Role.ADMIN))
              }
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
            >
              Make Admin
            </button>
            <hr className="w-px mx-1 h-5 bg-hr" />
            <button
              onClick={() =>
                executeAction(() => blockUsers(selectedUsers, true))
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-[#ef4444]"
            >
              <Ban className="w-3 h-3" />
              Block
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
              onClick={() =>
                executeAction(() => blockUsers(selectedUsers, false))
              }
            >
              <LockOpen className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-6 rounded-xl overflow-hidden border border-table-border">
        <table className="w-full">
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
              <th className="px-2 py-2.5 w-[30%]">User</th>
              <th className="px-4 py-2.5 w-[17%]">Email</th>
              <th className="px-4 py-2.5 w-[12%]">Provider</th>
              <th className="px-4 py-2.5 w-[12%]">Role</th>
              <th className="px-4 py-2.5 w-[12%]">Status</th>
              <th className="px-4 py-2.5 w-[12%]">Created</th>
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
                    <img
                      src={`${user.photoUrl ? user.photoUrl : defaultUser}`}
                      className="rounded-full h-10 w-10 object-fit"
                    />
                  </div>
                </td>
                <td className="px-2 py-2.5 font-medium text-sm text-nav-text-active">
                  {user.firstName} {user.lastName}
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
                <td className="px-4 py-2.5 text-date">{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-6 mt-3 flex items-center gap-1 justify-end">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        {page - 1 > 0 && (
          <button
            onClick={() => setPage(page - 1)}
            className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
          >
            {page - 1}
          </button>
        )}
        <button
          disabled
          className="w-8 h-8 flex text-white text-xs items-center justify-center font-semibold rounded-lg border border-table-border bg-table-header disabled:bg-nav-border-active"
        >
          {page}
        </button>
        {page + 1 <= totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
          >
            {page + 1}
          </button>
        )}
        {page + 2 <= totalPages && (
          <button
            onClick={() => setPage(page + 2)}
            className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr  disabled:cursor-not-allowed disabled:opacity-50"
          >
            {page + 2}
          </button>
        )}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="w-8 h-8 flex font-medium text-xs items-center justify-center rounded-lg border border-table-border bg-table-header text-hr disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </main>
  );
}
