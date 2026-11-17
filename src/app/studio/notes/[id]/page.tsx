import { Button } from "@/components/shadcnui/button";
import { getBackgroundImage } from "@/lib/backgrounds";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { format } from "date-fns";
import { ArrowLeft, Pin, Trash2 } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notifo | notes",
  description: "notes of Notifo notes application",
};

interface NotePageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: NotePageProps) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  const note = await prisma.note.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!note) notFound();

  const backgroundImage = getBackgroundImage(note.backgroundId);

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Link
        href="/studio"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2">
        <ArrowLeft className="size-4" />
        Back to notes
      </Link>

      <article className="relative overflow-hidden rounded-lg border shadow-lg">
        {backgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
            <div className="bg-background/70 absolute inset-0" />
          </div>
        )}

        <div className="relative z-10 p-8 md:p-12">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold">
              {note.title?.trim() ? note.title : "Untitled"}
            </h1>

            <div className="flex gap-2">
              {note.isPinned && <Pin className="size-5 text-amber-500" />}
            </div>
          </div>

          <div className="text-foreground/90 text-lg leading-relaxed whitespace-pre-wrap">
            {note.content}
          </div>

          <div className="text-muted-foreground mt-8 flex items-center justify-between border-t pt-4 text-sm">
            <span>
              Created{" "}
              {format(new Date(note.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </span>

            {note.updatedAt.getTime() !== note.createdAt.getTime() && (
              <span>
                Edited {format(new Date(note.updatedAt), "MMM d, yyyy")}
              </span>
            )}
          </div>
        </div>
      </article>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          disabled>
          Edit Note
          {/* TODO: Add edit functionality */}
        </Button>

        <Button
          variant="destructive"
          disabled>
          <Trash2 className="mr-2 size-4" />
          Delete
          {/* TODO: Add delete functionality */}
        </Button>
      </div>
    </div>
  );
};

export default Page;
