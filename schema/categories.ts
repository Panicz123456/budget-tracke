import { z } from "zod";

export const CreateCategoriesSchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().max(20),
  type: z.enum(["income", "expense"]),
});

export type CreateCategoriesSchemaType = z.infer<typeof CreateCategoriesSchema>;

export const DeleteCategoriesSchema = z.object({
  name: z.string().min(3).max(20),
  type: z.enum(["income", "expense"]),
});

export type DeleteCategoriesSchemaType = z.infer<typeof DeleteCategoriesSchema>;
