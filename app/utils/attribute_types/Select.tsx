import { useTranslation } from "react-i18next";

export default function Select() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium text-xs bg-[#eed7f8] dark:text-[#eed7f8] dark:bg-[#751580] text-[#751580]">
      {t("type.select")}
    </span>
  );
}
