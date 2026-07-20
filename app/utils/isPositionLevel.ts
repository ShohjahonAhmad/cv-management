import { PositionLevel } from "~/types/Position";

export default function isPositionLevel(level: string): level is PositionLevel{
    return Object.values(PositionLevel).includes(level as PositionLevel);
}