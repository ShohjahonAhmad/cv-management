import { useTranslation } from "react-i18next";

export default function Number() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium text-[#7e22ce] dark:text-[#fdf4ff] bg-[#fdf4ff] border dark:bg-[#7e22ce] text-xs">
      {t("type.number")}
    </span>
  );
}
