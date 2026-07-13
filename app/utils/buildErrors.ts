import z from "zod";

export function buildErrors(error: z.ZodError) {
    const errors: string[] = [];
  
    const tree = z.treeifyError(error) as any;
  
    if (tree.properties) {
      for (const value of Object.values(tree.properties) as any[]) {
        errors.push(...value.errors);
      }
    }
  
    return errors;
  }