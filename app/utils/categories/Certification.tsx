import { useTranslation } from "react-i18next";

export default function Certification() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded font-medium text-xs bg-[#f0fdf4] dark:text-[#f0fdf4] text-[#15803d] dark:bg-[#15803d]">
      {t("category.certification")}
    </span>
  );
}
