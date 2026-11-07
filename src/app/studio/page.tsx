import NoteCard from "@/components/Notes/NoteCard";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { CirclePlus } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notifo | Dashboard",
  description: "Dashboard of Notifo notes application",
};

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
      <h1 className="mb-6 text-2xl font-bold">Your Notes</h1>

      {notes.length === 0 ?
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
          <p className="text-lg">No notes yet</p>
          <p className="text-sm">Create your first note to get started!</p>
          <Link
            href="/studio/create"
            className="text-primary mt-2 flex items-center gap-2 hover:underline">
            <CirclePlus className="size-6" />
            <span>Create your first note</span>
          </Link>
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
