import { NavLink } from "react-router";
import BrandName from "./BrandName";
import ModeButton from "./ModeButton";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Menu() {
  const { t } = useTranslation();
  return (
    <header className="flex justify-between bg-background border-b border-border px-6 py-3">
      <div className="flex items-center gap-4">
        <BrandName />
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `text-sm font-normal text-nav-text ${isActive && "text-nav-text-active border-b-2 border-nav-border-active font-semibold"}`
          }
        >
          {t("menu.profile")}
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `text-sm font-normal text-nav-text ${isActive && "text-nav-text-active border-b-2 border-nav-border-active font-semibold"}`
          }
        >
          {t("menu.users")}
        </NavLink>
        <NavLink
          to="attributes"
          className={({ isActive }) =>
            `text-sm font-normal text-nav-text ${isActive && "text-nav-text-active border-b-2 border-nav-border-active font-semibold"}`
          }
        >
          {t("menu.attributes")}
        </NavLink>
        <NavLink
          to="positions"
          className={({ isActive }) =>
            `text-sm font-normal text-nav-text ${isActive && "text-nav-text-active border-b-2 border-nav-border-active font-semibold"}`
          }
        >
          {t("menu.positions")}
        </NavLink>
      </div>
      <div>
        <LanguageSwitcher />
        <ModeButton />
      </div>
    </header>
  );
}
