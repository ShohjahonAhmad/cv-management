import { useTranslation } from "react-i18next";

export default function SoftSkills() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded font-medium bg-[#fdf4ff] dark:text-[#fdf4ff] dark:bg-[#7e22ce] text-[#7e22ce] text-xs">
      {t("category.softSkills")}
    </span>
  );
}
