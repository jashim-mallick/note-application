import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const togglePinAction = async (noteId: string) => {
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
      select: { isPinned: true },
    });

    if (!note) {
      return {
        isSuccess: false,
        message: "Note not found",
      };
    }

    await prisma.note.update({
      where: { id: noteId, userId: session.user.id },
      data: { isPinned: !note.isPinned },
    });

    revalidatePath("/studio");
    return {
      isSuccess: true,
      message:
        note.isPinned ?
          "Note unpinned successfully"
        : "Note pinned successfully",
    };
  } catch (error) {
    console.error("Failed to toggle pin:", error);
    return {
      isSuccess: false,
      message: "Failed to toggle pin",
    };
  }
};

export default togglePinAction;
