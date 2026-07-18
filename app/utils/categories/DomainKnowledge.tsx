import { useTranslation } from "react-i18next";

export default function DomainKnowledge() {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded font-medium dark:text-[#f0f7ff] bg-[#f0f7ff] dark:bg-[#1d4ed8] text-[#1d4ed8] text-xs">
      {t("category.domainKnowledge")}
    </span>
  );
}
