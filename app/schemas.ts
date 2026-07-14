import z from "zod";
import { AttributeCategory, AttributeType } from "./types/Attribute";
import { PositionLevel } from "./types/Position";
const MAX_OPTIONS = 100;

export const AttributeOptionSchema = z.object({
    id: z.number().int().nonnegative("ID must be a non-negative integer").optional(),
    value: z.string().trim().min(1, "Option must be at least 1 character long").max(100, "Option must be at most 100 characters long"),
})

export type AttributeOption = z.infer<typeof AttributeOptionSchema>

export const CreateAttributeSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
    description: z.string().trim().min(3, "Description must be at least 3 characters long").max(500, "Description must be at most 500 characters long"),
    category: z.enum(AttributeCategory),
    type: z.enum(AttributeType),
    attributeOptions: z.array(AttributeOptionSchema).optional(),
}).superRefine(validateSelectOptions);


export const UpdateAttributeSchema = z.object({
    id: z.number().int().positive("ID must be a positive integer"),
    name: z.string().trim().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
    description: z.string().trim().min(3, "Description must be at least 3 characters long").max(500, "Description must be at most 500 characters long"),
    category: z.enum(AttributeCategory),
    updatedAt: z.coerce.date(),
    type: z.enum(AttributeType),
    attributeOptions: z.array(AttributeOptionSchema).optional(),
}).superRefine(validateSelectOptions);

function validateSelectOptions(data: {type: AttributeType; attributeOptions?: AttributeOption[]}, ctx: z.RefinementCtx){
    if(data.type === AttributeType.SELECT) {
        if((!data.attributeOptions || data.attributeOptions.length === 0)) {
            ctx.addIssue({
                code: "custom",
                path: ["attributeOptions"],
                message: "Options are required for SELECT type attributes",
            });
        } else if(data.attributeOptions.length > MAX_OPTIONS) {
            ctx.addIssue({
                code: "custom",
                path: ["attributeOptions"],
                message: "Options cannot exceed 100 items",
            });
        } else if(data.attributeOptions.some(option => option.value.trim().length === 0)){
            ctx.addIssue({
                code: "custom",
                path: ["attributeOptions"],
                message: "Options must be non-empty"
            })
        }
        else {
            const normalized = data.attributeOptions.map(option => option.value.trim().toLowerCase());
            if(normalized.length !== new Set(normalized).size){
                ctx.addIssue({
                    code: "custom",
                    path: ["attributeOptions"],
                    message: "Options must be unique",
                })
            }
        } 
    } 
}

export const CreatePositionSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
    description: z.string().trim().min(1, "Description is required").max(1000, "Description must be at most 1000 characters long"),
    company: z.string().trim().min(1, "Company is required").max(100, "Company must be at most 100 characters long"),
    level: z.enum(PositionLevel),
    maxProjects: z.coerce.number().int().min(1, "Maximum projects must be at least 1").default(3),
    attributeIds: z.array(z.coerce.number().int().positive()).default([]).refine(ids => new Set(ids).size === ids.length, "Duplicate attributes are not allowed"),
    tags: z.array(z.string().trim().min(1, "Tag must be at least 1 character long").max(50, "Tag must be at most 50 characters long")).default([]).refine(tags => new Set(tags.map(tag => tag.toLowerCase())).size === tags.length, "Duplicate project tags are not allowed"),
})