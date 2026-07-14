import { useTranslation } from "react-i18next";

export default function ErrorBanner({ errors }: { errors: string[] }) {
  const { t } = useTranslation();
  return (
    <div className="mx-6 mt-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
      <p className="font-medium text-red-400">
        {t("page.attribute.dialog.fix")}
      </p>

      <ul className="mt-2 list-disc pl-5 text-sm text-red-300">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
