import { t } from "i18next";
import { Briefcase, FileText, Send, Users } from "lucide-react";

export default function HomeStats({
  stats,
}: {
  stats: {
    totalNewCVs: number;
    totalPositions: number;
    totalCandidates: number;
    totalRecruiters: number;
    totalCVs: number;
  };
}) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <div className="p-4 rounded-xl bg-header border border-table-border">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-date uppercase tracking-wider">
              {t("page.home.newCVs")}
            </span>
            <p className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
              {stats.totalNewCVs.toLocaleString()}
            </p>
            <span className="text-[10px] text-date mt-0.5">
              {t("page.home.lastDay")}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center dark:bg-[#1A1A2E] bg-[#f5f3ff] border dark:border-[#2D2D5A] border-[#c4b5fd] ">
            <FileText className="w-4 h-4 text-[#6366f1] dark:text-[#818CF8]" />
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-header border border-table-border">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-date uppercase tracking-wider">
              {t("page.home.totalPositions")}
            </span>
            <p className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
              {stats.totalPositions.toLocaleString()}
            </p>
            <span className="text-[10px] text-date mt-0.5">
              {t("page.home.systemWide")}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center dark:bg-[#0F1E38] bg-[#f0f7ff] border dark:border-[#1E3A8A] border-[#bfdbfe] ">
            <Briefcase className="w-4 h-4 text-[#1d4ed8] dark:text-[#60A5FA]" />
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-header border border-table-border">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-date uppercase tracking-wider">
              {t("page.home.candidates")}
            </span>
            <p className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
              {stats.totalCandidates.toLocaleString()}
            </p>
            <span className="text-[10px] text-date mt-0.5">
              {t("page.home.activeProfiles")}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center dark:bg-[#0D2218] bg-[#f0fdf4] border dark:border-[#1A4030] border-[#bbf7d0] ">
            <Users className="w-4 h-4 text-[#15803d] dark:text-[#4ADE80]" />
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-header border border-table-border">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-date uppercase tracking-wider">
              {t("page.home.recruiters")}
            </span>
            <p className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
              {stats.totalRecruiters.toLocaleString()}
            </p>
            <span className="text-[10px] text-date mt-0.5">
              {t("page.home.active")}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center dark:bg-[#2A1248] bg-[#fdf4ff] border dark:border-[#581C87] border-[#e9d5ff] ">
            <Briefcase className="w-4 h-4 text-[#7e22ce] dark:text-[#C084FC]" />
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-header border border-table-border">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-date uppercase tracking-wider">
              {t("page.home.submittedCVs")}
            </span>
            <p className="text-[22px] font-bold text-nav-text-active tracking-[-0.5px]">
              {stats.totalCVs.toLocaleString()}
            </p>
            <span className="text-[10px] text-date mt-0.5">
              {t("page.home.allTime")}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center dark:bg-[#3A2415] bg-[#fff7ed] border dark:border-[#B45309] border-[#fed7aa] ">
            <Send className="w-4 h-4 text-[#c2410c] dark:text-[#FDBA74]" />
          </div>
        </div>
      </div>
    </div>
  );
}
