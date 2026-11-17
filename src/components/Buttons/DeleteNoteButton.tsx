"use client";

import deleteNoteAction from "@/hooks/server/deleteNoteAction";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";

const DeleteNoteButton = ({ noteId }: { noteId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    setIsDeleting(true);
    const result = await deleteNoteAction(noteId);

    if (result.isSuccess) {
      router.push("/studio");
      router.refresh();
    } else {
      alert(result.message);
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isDeleting}>
      <Trash2 className="mr-2 size-4" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteNoteButton;
