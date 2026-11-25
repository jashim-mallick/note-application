import EditNoteForm from "@/components/Forms/EditNoteForm";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
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
    select: {
      id: true,
      title: true,
      content: true,
      backgroundId: true,
    },
  });

  if (!note) notFound();

  return (
    <div className="container mx-auto p-6">
      <EditNoteForm note={note} />
    </div>
  );
};

export default Page;
