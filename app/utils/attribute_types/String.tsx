import { useTranslation } from "react-i18next";

export default function String() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded font-medium dark:text-[#fff1f0] bg-[#fff1f0] dark:bg-[#c0392b] text-[#c0392b] text-xs">
      {t("type.string")}
    </span>
  );
}
