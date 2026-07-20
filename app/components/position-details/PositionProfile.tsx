import { User, UserCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import type { Attribute } from "~/types/Attribute";
import { AttributeTypeC } from "../AttributeTypeC";
import { NavLink } from "react-router";

type PositionProfileProps = {
  completedRequiredAttributes: number;
  totalRequiredAttributes: number;
  missingAttributes: Attribute[];
};

export default function PositionProfile({
  completedRequiredAttributes,
  totalRequiredAttributes,
  missingAttributes,
}: PositionProfileProps) {
  const { t } = useTranslation();
  const completionPercentage =
    totalRequiredAttributes === 0
      ? 100
      : Math.round(
          (completedRequiredAttributes / totalRequiredAttributes) * 100
        );
  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl bg-header border border-table-border">
      <div className="flex items-center gap-2 border-b border-header-border pb-3">
        <UserCheck className="w-3.5 h-3.5 text-nav-text" />
        <span className="text-[13px] font-semibold text-nav-text-active">
          {t("page.positionDetails.profile")}
        </span>
      </div>
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
            {completedRequiredAttributes}{" "}
            <span className="text-[13px] font-normal text-date">
              / {totalRequiredAttributes}
            </span>
          </p>
          <p className="text-xs text-nav-text mt-1">
            {" "}
            {t("page.positionDetails.completed")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {missingAttributes.length > 0 && (
          <>
            <p className="text-[11px] font-semibold text-hr">
              {t("page.positionDetails.missingAttributes")}
            </p>

            {missingAttributes.map((attribute) => (
              <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-miss-bg border border-miss-border">
                <span className="text-xs text-miss-text">{attribute.name}</span>
                <AttributeTypeC type={attribute.type} />
              </div>
            ))}

            <NavLink
              to="/profile"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg mt-1 bg-profile-bg text-profile-text font-medium text-xs border border-profile-border"
            >
              <User className="w-3 h-3" />
              {t("page.positionDetails.completeProfile")}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
