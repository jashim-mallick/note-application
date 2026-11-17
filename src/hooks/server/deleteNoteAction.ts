"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const deleteNoteAction = async (noteId: string) => {
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

    const note = await prisma.note.findFirst({
      where: { id: noteId, userId: session.user.id },
      select: { id: true },
    });

    if (!note) {
      return {
        isSuccess: false,
        message: "Note not found",
      };
    }

    await prisma.note.delete({
      where: { id: noteId, userId: session.user.id },
    });

    revalidatePath("/studio");
    return {
      isSuccess: true,
      message: "Note deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete note:", error);
    return {
      isSuccess: false,
      message: "Failed to delete note",
    };
  }
};

export default deleteNoteAction;
