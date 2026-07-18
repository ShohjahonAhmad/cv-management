import { useTranslation } from "react-i18next";

export default function Boolean() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium text-xs bg-[#f0fdf4] dark:text-[#f0fdf4] dark:bg-[#15803d] text-[#15803d]">
      {t("type.boolean")}
    </span>
  );
}
