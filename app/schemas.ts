import z from "zod";
import { AttributeCategory, AttributeType } from "./types/Attribute";

export const CreateAttributeSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
    description: z.string().trim().min(1, "Description must be at least 3 characters long").max(500, "Description must be at most 200 characters long"),
    category: z.enum(AttributeCategory),
    type: z.enum(AttributeType)
});

export const UpdateAttributeSchema = z.object({
    id: z.number().int().positive("ID must be a positive integer"),
    name: z.string().trim().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
    description: z.string().trim().min(1, "Description must be at least 3 characters long").max(500, "Description must be at most 200 characters long"),
    category: z.enum(AttributeCategory),
    updatedAt: z.coerce.date(),
});