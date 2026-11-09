"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createNoteAction = async (data: {
  title: string | null;
  content: string;
  backgroundId?: string | null;
}) => {
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

    await prisma.note.create({
      data: {
        title: data.title ?? "",
        content: data.content,
        backgroundId: data.backgroundId,
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
