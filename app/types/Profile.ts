import type { AttributeOption } from "~/schemas";
import type { Attribute } from "./Attribute";

export type Profile = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    location: string | null;
    photoUrl: string | null;
    headline: string | null;
    aboutMe: string | null;
    phone: string | null;
    attributeValues: AttributeValue[];
}

export type AttributeValue = {
    id: number;
    candidateId: number;
    attributeId: number;
    stringValue: string | null;
    textValue: string | null;
    numericValue: number | null;
    booleanValue: boolean | null;
    dateValue: string | null;
    periodStart: string | null;
    periodEnd: string | null;
    imageUrl: string | null;
    optionId: number | null;
    createdAt: string;
    updatedAt: string;
    attribute: Attribute;
    option: AttributeOption | null;
}

export type UpdateProfile = Omit<Profile, "id" | "email">;