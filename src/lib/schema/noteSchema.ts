import z from "zod";

const noteSchema = z.object({
  title: z.string().max(70, "Title must be at most 70 characters").optional(),
  content: z
    .string()
    .trim()
    .min(1, "Content cannot be empty")
    .max(10000, "Content must be at most 10000 characters"),
  backgroundId: z.string().nullable().optional(),
});

export const createNoteSchema = noteSchema;

export const updateNoteSchema = noteSchema.extend({
  id: z.string().min(1, "Note ID is required"),
});

export type NoteType = z.infer<typeof noteSchema>;
export type UpdateNoteType = z.infer<typeof updateNoteSchema>;
