import { NavLink } from "react-router";
import Logo from "~/utils/Logo";

export default function BrandName() {
  return (
    <NavLink className="flex items-center gap-2.5 mr-4 cursor-pointer" to="/">
      <div className="w-8 h-8 rounded-sm flex items-center justify-center dark:bg-white bg-[#111111]">
        <span className="dark:text-[#111111] text-white inline-flex items-center justify-center shrink-0">
          <Logo />
        </span>
      </div>
      <span className="font-bold text-base dark:text-white text-[#111111] tracking-[-0.3px]">
        HireBoard
      </span>
    </NavLink>
  );
}
