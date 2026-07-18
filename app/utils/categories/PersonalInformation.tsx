import { useTranslation } from "react-i18next";

export default function PersonalInformation() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded font-medium bg-[#fefce8] text-[#a16207] dark:text-[#fefce8] dark:bg-[#a16207] text-xs">
      {t("category.personalInformation")}
    </span>
  );
}
