import { useTranslation } from "react-i18next";

export default function UsersHeader({
  total,
  page,
  totalPages,
}: {
  total: number;
  page: number;
  totalPages: number;
}) {
  const { t } = useTranslation();
  return (
    <div className="px-2 lg:px-6 py-5 flex items-center justify-between">
      <div>
        <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
          {t("page.user.title")}
        </h1>
        <p className="text-xs text-nav-text mt-0.5">
          {t("page.user.subtitle")}
        </p>
      </div>

      <span className="text-xs text-nav-text">
        {total} {t("page.user.users")} · {t("page.user.page")}
        <strong className="mx-1 text-nav-text-active">{page}</strong>
        {t("page.user.of")} {totalPages}
      </span>
    </div>
  );
}
