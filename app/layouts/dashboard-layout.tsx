import { Outlet, useLoaderData } from "react-router";
import { getCurrentUser } from "~/api/getUsers";
import Menu from "~/components/Menu";
import UserContext from "~/context/UserContext";

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

export default function DashboardLayout() {
  const user = useLoaderData();
  return (
    <div className="min-h-screen">
      <UserContext.Provider value={user}>
        <Menu />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}
