"use server";

import prisma from "@/lib/prisma";
import {
  CreateCategoriesSchema,
  CreateCategoriesSchemaType,
  DeleteCategoriesSchema,
  DeleteCategoriesSchemaType,
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

export async function DeleteCategory(form: DeleteCategoriesSchemaType) {
  const parseBody = DeleteCategoriesSchema.safeParse(form);

  if (!parseBody.success) {
    throw new Error("bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const categories = await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name: parseBody.data.name,
        type: parseBody.data.type,
      },
    },
  });
}
