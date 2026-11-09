import QuickNoteForm from "@/components/Forms/QuickNoteForm";
import NoteCard from "@/components/Notes/NoteCard";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="container mx-auto p-6">
      <QuickNoteForm />

      <h1 className="mb-6 text-2xl font-bold">Your Notes</h1>

      {notes.length === 0 ?
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
          <p className="text-lg">No notes yet</p>
          <p className="text-sm">
            Create your first note above to get started!
          </p>
        </div>
      : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              createdAt={note.createdAt}
              backgroundId={note.backgroundId}
              isPinned={note.isPinned}
            />
          ))}
        </div>
      }
    </div>
  );
};
export default page;
