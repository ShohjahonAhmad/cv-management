import { AlignLeft, ArrowLeft, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink, useLoaderData } from "react-router";
import PositionDescription from "~/components/position-details/PositionDescription";
import PositionHeader from "~/components/position-details/PositionHeader";
import type { Route } from "./+types/position-details";
import { getPositionById } from "~/api/getPositions";
import type { Position } from "~/types/Position";
import PositionAttributes from "~/components/position-details/PositionAttributes";
import PositionProfile from "~/components/position-details/PositionProfile";
import type { Attribute } from "~/types/Attribute";
import PositionApply from "~/components/position-details/PositionApply";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const position = await getPositionById(id);

  return position;
}

type LoaderData = {
  position: Position;
  completedRequiredAttributes: number;
  totalRequiredAttributes: number;
  missingAttributes: Attribute[];
};

export default function PositionDetails() {
  const { t } = useTranslation();
  const {
    position,
    completedRequiredAttributes,
    totalRequiredAttributes,
    missingAttributes,
  } = useLoaderData<LoaderData>();
  return (
    <main className="flex flex-col min-h-screen items-center bg-table-header">
      <div className="px-10 py-8 max-w-[1100px] w-full">
        <NavLink
          to=".."
          className="inline-flex items-center gap-1.5 mb-6 text-[13px] text-nav-text font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t("page.positionDetails.back")}
        </NavLink>

        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <PositionHeader position={position} />
            <PositionDescription description={position.description} />
            <PositionAttributes
              attributes={position.positionAttributes.map(
                (attr) => attr.attribute
              )}
            />
          </div>
          <div className="flex flex-col gap-4 w-75 shrink-0">
            <PositionProfile
              completedRequiredAttributes={completedRequiredAttributes}
              totalRequiredAttributes={totalRequiredAttributes}
              missingAttributes={missingAttributes}
            />
            <PositionApply />
          </div>
        </div>
      </div>
    </main>
  );
}
