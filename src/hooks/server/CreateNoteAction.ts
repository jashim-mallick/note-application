"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { noteSchema } from "@/lib/schema/noteSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createNoteAction = async (data: unknown) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        isSuccess: false,
        message: "User is not authenticated",
      };
    }

    //zod validation
    const validation = noteSchema.safeParse(data);

    if (!validation.success) {
      return {
        isSuccess: false,
        message: "Invalid input data",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { title, content, backgroundId } = validation.data;

    await prisma.note.create({
      data: {
        title: title ?? "",
        content,
        backgroundId: backgroundId ?? null,
        userId: session.user.id,
      },
    });

    revalidatePath("/studio");

    return {
      isSuccess: true,
      message: "Note created successfully",
    };
  } catch (error) {
    console.error("Failed to create note:", error);
    return {
      isSuccess: false,
      message: "Failed to create note",
    };
  }
};
