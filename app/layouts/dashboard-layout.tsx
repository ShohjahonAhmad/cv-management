import { Outlet, useLoaderData } from "react-router";
import { getCurrentUser } from "~/api/getUsers";
import Menu from "~/components/Menu";
import UserContext from "~/context/UserContext";
import SupportTicket from "~/components/SupportTicket";
import type { Route } from "./+types/dashboard-layout";

export async function clientLoader() {
  try {
    const user = await getCurrentUser();
    localStorage.setItem("role", user.role);
    return user;
  } catch (err) {
    localStorage.removeItem("role");
    return null;
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireBoard" },
    { name: "description", content: "Welcome to HireBoard!" },
  ];
}

export default function DashboardLayout() {
  const user = useLoaderData();

  return (
    <div className="min-h-screen">
      <UserContext.Provider value={user}>
        <Menu />
        <Outlet />
        <SupportTicket />
      </UserContext.Provider>
    </div>
  );
}
