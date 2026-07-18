import { useTranslation } from "react-i18next";

export default function Date() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium text-xs bg-[#f0f9ff] dark:text-[#f0f9ff] text-[#0369a1] dark:bg-[#0369a1]">
      {t("type.date")}
    </span>
  );
}
