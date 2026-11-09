import z from "zod";

export const noteSchema = z.object({
  title: z.string().max(70, "Title must be at most 70 characters").optional(),
  content: z.string().max(10000, "Content must be at most 10000 characters"),
  backgroundId: z.string().nullable().optional(),
});

export type NoteType = z.infer<typeof noteSchema>;
