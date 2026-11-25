"use client";

import DeleteNoteAction from "@/server/DeleteNoteAction";
import TogglePinAction from "@/server/TogglePinAction";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
  const isPendingRef = useRef(false);

  const acquireGuard = () => {
    if (isPendingRef.current) return false;
    isPendingRef.current = true;
    setIsPending(true);
    return true;
  };

  const releaseGuard = () => {
    isPendingRef.current = false;
    setIsPending(false);
  };

  const handlePinToggle = async (id: string, shouldPin: boolean) => {
    console.log(`Pin toggle clicked for: ${id}, shouldPin: ${shouldPin}`);

    if (!acquireGuard()) {
      console.log("Pin toggle blocked - already pending");
      return;
    }

    try {
      const result = await TogglePinAction(id, shouldPin);
      console.log("Pin toggle result:", result);

      if (!result.isSuccess) {
        toast.error(result.message || "Failed to update pin status", {
          description: "Please try again or refresh the page",
          action: {
            label: "Retry",
            onClick: () => handlePinToggle(id, shouldPin),
          },
        });
        releaseGuard();
        return;
      }

      toast.success(
        result.message || (shouldPin ? "Note pinned" : "Note unpinned"),
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
          onClick: () => handlePinToggle(id, shouldPin),
        },
      });
    } finally {
      releaseGuard();
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Delete handler called for:", id);

    if (!acquireGuard()) {
      console.log("Delete blocked - already pending");
      return;
    }

    console.log("Calling deleteNoteAction...");

    try {
      const result = await DeleteNoteAction(id);
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
        releaseGuard();
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
      releaseGuard();
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/studio/editNote/${id}` as Route);
  };

  const onPinToggle = (id: string) => {
    const shouldPin = !props.isPinned;
    handlePinToggle(id, shouldPin);
  };

  return (
    <NoteCard
      {...props}
      isLoading={isPending}
      onPinToggle={onPinToggle}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default NoteCardAction;
