"use server";

import prisma from "@/lib/prisma";
import {
  CreateCategoriesSchema,
  CreateCategoriesSchemaType,
} from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategoriesSchemaType) {
  const parseBody = CreateCategoriesSchema.safeParse(form);

  if (!parseBody.success) {
    throw new Error("Something went wrong");
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { name, icon, type } = parseBody.data;

  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
}
