import { useTranslation } from "react-i18next";

export default function HomeHeader({
  name,
  total,
}: {
  name: string;
  total: number;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
        {t("page.home.greeting", { name })}
      </h1>
      <p className="text-[13px] mt-1 text-nav-text">
        {t("page.home.description", { total })}
      </p>
    </div>
  );
}
