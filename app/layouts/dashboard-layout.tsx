import { Outlet } from "react-router";
import Menu from "~/components/Menu";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Menu />
      <Outlet />
    </div>
  );
}
