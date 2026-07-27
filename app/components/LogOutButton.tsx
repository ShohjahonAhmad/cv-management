import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function LogOutButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    toast.success(t("menu.toast.loggedOut"));
  }

  return (
    <button
      onClick={handleLogOut}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-header border border-table-border text-sm font-medium text-[#b91c1c]"
    >
      <LogOut className="w-3 h-3" />
      {t("menu.logout")}
    </button>
  );
}
