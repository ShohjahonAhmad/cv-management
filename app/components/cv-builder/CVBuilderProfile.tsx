import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useTranslation } from "react-i18next";
import type { Profile } from "~/types/Profile";

export default function CVBuilderProfile({
  profile,
  missing,
  all,
}: {
  profile: Profile;
  missing: number;
  all: number;
}) {
  const { t } = useTranslation();
  const completionPercentage =
    all === 0 ? 100 : Math.round(((all - missing) / all) * 100);
  return (
    <div className="flex flex-col gap-4 w-60 shrink-0">
      <div className="flex flex-col items-center gap-4 px-5 py-6 rounded-xl border border-table-border bg-header">
        <img
          src={profile.photoUrl || "/image.png"}
          className="w-16 h-16 rounded-full"
          alt="UserAvatar"
        />

        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-semibold text-sm text-nav-text-active">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-[11px] text-nav-text">{profile.headline}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 rounded-xl border border-table-border bg-header text-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16">
            <CircularProgressbar
              value={completionPercentage}
              text={`${completionPercentage}%`}
              styles={buildStyles({
                pathColor: "#6366f1",
                trailColor: "var(--header-border)",
                textColor: "var(--nav-text-active)",
              })}
            />
          </div>
          <div>
            <p className="text-xl font-bold text-nav-text-active tracking-[-0.5px] leading-none">
              {all - missing}{" "}
              <span className="text-[13px] font-normal text-date">/ {all}</span>
            </p>
            <p className="text-xs text-nav-text mt-1">
              {" "}
              {t("page.positionDetails.completed")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
