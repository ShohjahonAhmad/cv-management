import { useTranslation } from "react-i18next";

export default function HomeChips({ total }: { total: number }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nav-border-active text-white border-0 text-[13px] font-semibold cursor-default">
        {t("page.home.allPositions")}
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-white text-[10px] font-semibold bg-[#FFFFFF26]">
          {total}
        </span>
      </div>
    </div>
  );
}
