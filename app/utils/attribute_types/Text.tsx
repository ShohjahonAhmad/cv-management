import { useTranslation } from "react-i18next";

export default function Text() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-[#f0f7ff] dark:text-[#f0f7ff] dark:bg-[#1d4ed8] text-[#1d4ed8] text-xs">
      {t("type.text")}
    </span>
  );
}
