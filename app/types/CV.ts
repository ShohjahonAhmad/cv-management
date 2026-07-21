import type { Position } from "./Position";
import type { Profile } from "./Profile";

export enum CVStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
}

export type CV = {
    id: number;
    positionId: number;
    candidateId: number;
    status: CVStatus;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    position: Position
    candidate: Profile 
}