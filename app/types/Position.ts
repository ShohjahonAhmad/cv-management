import type { Attribute } from "./Attribute";

export type SelectedPosition = {
    id: number;
    updatedAt: string; 
}

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
    _count: {
        positionAttributes: number;
        positionProjectTags: number;
    }
}

export type CreatePosition = {
    title: string;
    description: string;
    company: string;
    level: PositionLevel;
    maxProjects: number;
    attributeIds: number[];
    tags: string[];
}

export type UpdatePosition = CreatePosition & {id: string, updatedAt: Date};

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

export type Dialog = {
    open: boolean;
    mode: "create" | "edit";
    position?: Position;
  };