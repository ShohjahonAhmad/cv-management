import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };
  return (
    <select
      value={i18n.language}
      onChange={handleLanguageChange}
      className="border mx-2 mt-1.5 border-table-border rounded-lg px-3 py-2 bg-table-header text-xs ml-3"
    >
      <option value={"en"}>English</option>
      <option value={"uz"}>O'zbek</option>
    </select>
  );
}
