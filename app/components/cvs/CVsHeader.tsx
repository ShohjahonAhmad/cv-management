import { useTranslation } from "react-i18next";

export default function CVsHeader({
  page,
  totalCount,
  totalPages,
}: {
  page: number;
  totalCount: number;
  totalPages: number;
}) {
  const { t } = useTranslation();
  return (
    <div className="px-2 lg:px-6 py-5 flex items-center flex-col lg:flex-row gap-2 justify-between border-b border-header-border">
      <div>
        <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
          {t("page.cvs.title")}
        </h1>
        <p className="text-[13px] text-nav-text mt-0.5">
          {t("page.cvs.subtitle")}
        </p>
      </div>
      <div className="flex items-center gap-1 text-xs text-nav-text">
        {totalCount}
        <span>{t("page.cvs.title")}</span>·<span>{t("page.cvs.page")}</span>
        <strong className="text-nav-text-active">{page}</strong>
        <span>
          {t("page.cvs.of")} {totalPages}
        </span>{" "}
      </div>
    </div>
  );
}
