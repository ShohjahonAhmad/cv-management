import { ArrowLeft, Compass, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col px-6 py-30">
        <div className="relative flex items-center justify-center mb-8">
          <span className="text-[160px] font-extrabold tracking-[-8px] leading-1 text-header-border">
            404
          </span>
          <div className="absolute flex items-center justify-center w-16 h-16 rounded-2xl bg-nav-border-active">
            <Compass className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 text-center max-w-100">
        <h1 className="font-bold text-2xl text-nav-text-active tracking-[-0.5px]">
          {t("page.notFound.title")}
        </h1>
        <p className="text-sm text-nav-text leading-[1.65]">
          The page you're looking for doesn't exist or has been moved. Check the
          URL or navigate back.
        </p>
      </div>
      <div className="flex items-center gap-3 mt-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-nav-border-active text-white text-[13px]"
        >
          <Home className="w-[13px] h-[13px]" />
          Go to Dashboard
        </NavLink>
        <NavLink
          to=".."
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-table-header border border-table-border text-hr text-[13px]"
        >
          <ArrowLeft className="w-[13px] h-[13px]" />
          Go Back
        </NavLink>
      </div>
    </main>
  );
}
