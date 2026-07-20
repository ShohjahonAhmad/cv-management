import { useTranslation } from "react-i18next";

export default function NotSpecified() {
  const { t } = useTranslation();
  return (
    <p className="text-xs text-date">
      {t("page.profile.attributes.notSpecified")}
    </p>
  );
}
