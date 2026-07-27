import { NavLink } from "react-router";
import BrandName from "./BrandName";
import ModeButton from "./ModeButton";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useUser } from "~/context/UserContext";
import { Role } from "~/types/Role";
import { LogOut } from "lucide-react";
import LogOutButton from "./LogOutButton";

const NAV_ITEMS: { to: string; labelKey: string; roles: Role[] }[] = [
  {
    to: "/profile",
    labelKey: "menu.profile",
    roles: [Role.ADMIN, Role.RECRUITER, Role.CANDIDATE],
  },
  { to: "/users", labelKey: "menu.users", roles: [Role.ADMIN] },
  {
    to: "/attributes",
    labelKey: "menu.attributes",
    roles: [Role.ADMIN, Role.RECRUITER],
  },
  {
    to: "/positions",
    labelKey: "menu.positions",
    roles: [Role.ADMIN, Role.RECRUITER],
  },
  {
    to: "/cvs",
    labelKey: "menu.cvs",
    roles: [Role.ADMIN, Role.RECRUITER, Role.CANDIDATE],
  },
];

export default function Menu() {
  const { t } = useTranslation();
  const { role } = useUser();

  const visibleNavItems = NAV_ITEMS.filter((item) => item.roles.includes(role));
  return (
    <header className="flex justify-between bg-background border-b border-border px-6 py-3">
      <div className="flex items-center gap-4 overflow-x-auto">
        <BrandName />
        {visibleNavItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.to}
            className={({ isActive }) =>
              `text-sm font-normal text-nav-text ${isActive && "text-nav-text-active border-b-2 border-nav-border-active font-semibold"}`
            }
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <LanguageSwitcher />
        <ModeButton />
        <LogOutButton />
      </div>
    </header>
  );
}
