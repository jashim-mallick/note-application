"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const deleteNoteAction = async (noteId: string) => {
  console.log("Server: Delete action called for noteId:", noteId);

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log(
      "Server: Session check:",
      session ? "Authenticated" : "Not authenticated",
    );

    if (!session) {
      return {
        isSuccess: false,
        message: "User is not authenticated",
      };
    }

    console.log(
      "Server: Looking for note with id:",
      noteId,
      "userId:",
      session.user.id,
    );

    const note = await prisma.note.findFirst({
      where: { id: noteId, userId: session.user.id },
      select: { id: true },
    });

    console.log("Server: Note found:", note ? "Yes" : "No");

    if (!note) {
      return {
        isSuccess: false,
        message: "Note not found or you don't have permission",
      };
    }

    await prisma.note.delete({
      where: { id: noteId },
    });

    console.log("Server: Note deleted successfully");

    revalidatePath("/studio");
    return {
      isSuccess: true,
      message: "Note deleted successfully",
    };
  } catch (error) {
    console.error("Server: Failed to delete note:", error);
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to delete note",
    };
  }
};

export default deleteNoteAction;
