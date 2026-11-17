"use client";

import deleteNoteAction from "@/hooks/server/deleteNoteAction";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../shadcnui/button";

const DeleteNoteButton = ({ noteId }: { noteId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    setIsDeleting(true);

    try {
      const result = await deleteNoteAction(noteId);

      if (result.isSuccess) {
        toast.success("Note deleted successfully");
        router.push("/studio");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete note");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Delete note failed:", error);
      toast.error("Something went wrong", {
        description: "Please check your connection and try again",
        action: {
          label: "Retry",
          onClick: handleDelete,
        },
      });
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
