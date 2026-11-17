"use client";

import deleteNoteAction from "@/hooks/server/deleteNoteAction";
import togglePinAction from "@/hooks/server/togglePinAction";
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
  return (
    <NoteCard
      {...props}
      onPinToggle={async (id) => {
        const result = await togglePinAction(id);
        if (!result.isSuccess) {
          console.error(result.message || "Failed to toggle pin");
        }
      }}
      onDelete={async (id) => {
        const result = await deleteNoteAction(id);
        if (!result.isSuccess) {
          console.error(result.message || "Failed to delete note");
        }
      }}
    />
  );
};

export default NoteCardAction;
