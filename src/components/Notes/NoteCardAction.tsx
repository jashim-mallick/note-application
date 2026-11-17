"use client";

import deleteNoteAction from "@/hooks/server/deleteNoteAction";
import togglePinAction from "@/hooks/server/togglePinAction";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import NoteCard from "./NoteCard";

type NoteCardActionsProps = {
  id: string;
  title: string | null;
  content: string;
  createdAt: Date | string;
  backgroundId?: string | null;
  isPinned?: boolean;
};

const NoteCardAction = (props: NoteCardActionsProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handlePinToggle = async (id: string) => {
    console.log("Pin toggle clicked for:", id);
    if (isPending) return;

    setIsPending(true);
    try {
      const result = await togglePinAction(id);
      console.log("Pin toggle result:", result);

      if (!result.isSuccess) {
        toast.error(result.message || "Failed to update pin status", {
          description: "Please try again or refresh the page",
          action: {
            label: "Retry",
            onClick: () => handlePinToggle(id),
          },
        });
        return;
      }

      toast.success(
        result.message || (props.isPinned ? "Note unpinned" : "Note pinned"),
      );
    } catch (error) {
      console.error("Pin toggle error:", error);
      toast.error("Unable to update note", {
        description:
          error instanceof Error ?
            error.message
          : "Please check your connection",
        action: {
          label: "Retry",
          onClick: () => handlePinToggle(id),
        },
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Delete handler called for:", id);

    if (isPending) {
      console.log("Delete blocked - already pending");
      return;
    }

    setIsPending(true);
    console.log("Calling deleteNoteAction...");

    try {
      const result = await deleteNoteAction(id);
      console.log("Delete result:", result);

      if (!result.isSuccess) {
        console.error("Delete failed:", result.message);
        toast.error(result.message || "Failed to delete note", {
          description: "The note was not deleted. Please try again.",
          action: {
            label: "Retry",
            onClick: () => handleDelete(id),
          },
        });
        setIsPending(false);
        return;
      }

      console.log("Delete successful!");
      toast.success("Note deleted successfully");

      router.refresh();
    } catch (error) {
      console.error("Delete exception:", error);
      toast.error("Unable to delete note", {
        description:
          error instanceof Error ? error.message : "Please try again",
        action: {
          label: "Retry",
          onClick: () => handleDelete(id),
        },
      });
      setIsPending(false);
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit clicked for:", id);
    router.push(`/studio/notes/${id}/edit` as Route);
  };

  return (
    <NoteCard
      {...props}
      isLoading={isPending}
      onPinToggle={handlePinToggle}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default NoteCardAction;
