import type { Attribute } from "./Attribute";

export type Position = {
    id: number;
    title: string;
    description: string;
    company: string;
    level: PositionLevel
    maxProjects: number;
    positionAttributes: {attribute: Attribute}[];
    positionProjectTags: {projectTag: ProjectTag}[];
    createdAt: string;
    updatedAt: string;
} 

export enum PositionLevel {
    INTERN="INTERN",
    JUNIOR="JUNIOR",
    MIDDLE="MIDDLE",
    SENIOR="SENIOR",
    LEAD="LEAD",
    MANAGER="MANAGER",
    DIRECTOR="DIRECTOR",
    VP="VP",
    C_LEVEL="C_LEVEL"
  }

export type ProjectTag = {
    id: number;
    name: string;
}