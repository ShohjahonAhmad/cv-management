import { Checkbox } from "~/components/ui/checkbox";
import { Ban, LockOpen } from "lucide-react";
import Admin from "~/utils/roles/Admin";
import Candidate from "~/utils/roles/Candidate";
import Recruiter from "~/utils/roles/Recruiter";
import GoogleProvider from "~/utils/providers/GoogleProvider";
import GitHubProvider from "~/utils/providers/GitHubProvider";
import Active from "~/utils/statuses/Active";
import Blocked from "~/utils/statuses/Blocked";
import getUsers from "~/api/getUsers";
import { useLoaderData } from "react-router";

export async function clientLoader() {
  console.log(localStorage.getItem("token"));
  const users = await getUsers();

  return users;
}

export default function Users() {
  const { users } = useLoaderData();
  return (
    <main>
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
            User Management
          </h1>
          <p className="text-xs text-nav-text mt-0.5">
            Manage roles, permissions, and account status acrosss all users
          </p>
        </div>

        <span className="text-xs text-nav-text">
          248 users · Page
          <strong className="mx-1 text-nav-text-active">1</strong>
          of 25
        </span>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="mx-6 mb-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
            <div className="flex items-center gap-2 mr-2">
              <Checkbox className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
              <span className="text-xs font-semibold text-white">
                3 selected
              </span>
            </div>
            <hr className="w-px mx-1 h-5 bg-hr" />
            <span className="text-xs dark:text-[#ffffff99] text-[#9ca3af]">
              Change Role:{" "}
            </span>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
              data-media-type="banani-button"
            >
              Make Candidate
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
              data-media-type="banani-button"
            >
              Make Recruiter
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
              data-media-type="banani-button"
            >
              Make Admin
            </button>
            <hr className="w-px mx-1 h-5 bg-hr" />
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-[#ef4444]">
              <Ban className="w-3 h-3" />
              Block
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[#374151] dark:bg-[#ffffff26] dark:text-white text-[#d1d5db]"
              data-media-type="banani-button"
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
                <Checkbox className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
              </th>
              <th className="px-2 py-2.5 w-[35%]">User</th>
              <th className="px-4 py-2.5 w-[12%]">Email</th>
              <th className="px-4 py-2.5 w-[12%]">Provider</th>
              <th className="px-4 py-2.5 w-[12%]">Role</th>
              <th className="px-4 py-2.5 w-[12%]">Status</th>
              <th className="px-4 py-2.5 w-[12%]">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr className="text-xs" key={user.id}>
                <td className="pl-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                    <div className="rounded-full bg-amber-400 h-10 w-10"></div>
                  </div>
                </td>
                <td className="px-2 py-2.5 font-medium text-sm text-nav-text-active">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2.5 truncate text-nav-text">
                  {user.email}
                </td>
                <td className="px-4 py-2.5">
                  {user.provider === "github" ? (
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
                  {user.isBlocked === "ACTIVE" ? <Active /> : <Blocked />}
                </td>
                <td className="px-4 py-2.5 text-date">{user.createdAt}</td>
              </tr>
            ))}

            <tr className="text-xs">
              <td className="pl-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Checkbox className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  <div className="rounded-full bg-amber-400 h-10 w-10"></div>
                </div>
              </td>
              <td className="px-2 py-2.5 font-medium text-sm text-nav-text-active">
                Sarah Chen
              </td>
              <td className="px-4 py-2.5 truncate text-nav-text">
                sarah.chen@gmail.com
              </td>
              <td className="px-4 py-2.5">
                <GitHubProvider />
              </td>
              <td className="px-4 py-2.5">
                <Recruiter />
              </td>
              <td className="px-4 py-2.5">
                <Blocked />
              </td>
              <td className="px-4 py-2.5 text-date">Jan 12, 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
