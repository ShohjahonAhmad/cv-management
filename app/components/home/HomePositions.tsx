import type { Position } from "~/types/Position";
import PositionCard from "../PositionCard";
import { useTranslation } from "react-i18next";

export default function HomePositions({
  positions,
}: {
  positions: Position[];
}) {
  const { t } = useTranslation();
  return positions.length === 0 ? (
    <div className="flex items-center justify-center py-16 border border-dashed border-table-border rounded-xl">
      <p className="text-sm text-nav-text">{t("page.home.noPositions")}</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {positions.map((position: Position) => (
        <PositionCard key={position.id} position={position} />
      ))}
    </div>
  );
}
