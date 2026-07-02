import { NavLink } from "react-router";
import BrandName from "./BrandName";
import ModeButton from "./ModeButton";

export default function Menu() {
  return (
    <header className="flex justify-between bg-background border-b border-border gap-4 px-6 py-3">
      <div className="flex items-center">
        <BrandName />
        <NavLink
          to="users"
          className={({ isActive }) =>
            `
      text-sm
      font-normal
      text-nav-text
      ${
        isActive
          ? "text-nav-text-active border-b-2 border-nav-border-active font-semibold"
          : ""
      }
    `
          }
        >
          Users
        </NavLink>
      </div>
      <ModeButton />
    </header>
  );
}
