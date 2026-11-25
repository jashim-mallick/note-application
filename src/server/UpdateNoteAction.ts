"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { updateNoteSchema } from "@/lib/schema/noteSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type ActionResult = {
  isSuccess: boolean;
  message: string;
};

export const updateNoteAction = async (data: {
  id: string;
  title?: string | null;
  content: string;
  backgroundId?: string | null;
}): Promise<ActionResult> => {
  // Add auth check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { isSuccess: false, message: "Not authenticated" };
  }

  const validated = updateNoteSchema.safeParse(data);
  if (!validated.success) {
    return { isSuccess: false, message: "Invalid input data" };
  }

  const { id, title, content, backgroundId } = validated.data;

  try {
    // Verify ownership
    const existing = await prisma.note.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return { isSuccess: false, message: "Note not found" };
    }

    const result = await prisma.note.update({
      where: { id },
      data: {
        title: title ?? null,
        content,
        backgroundId: backgroundId ?? null,
      },
    });

    revalidatePath("/studio");
    if (result) {
      revalidatePath("/studio");
    }

    return { isSuccess: true, message: "Note updated successfully" };
  } catch (error) {
    console.error("Failed to update note:", error);
    return { isSuccess: false, message: "Failed to update note" };
  }
};
