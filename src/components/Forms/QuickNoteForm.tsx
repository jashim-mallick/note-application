"use client";

import { createNoteAction } from "@/hooks/server/CreateNoteAction";
import { getBackgroundImage } from "@/lib/backgrounds";
import { noteSchema, NoteType } from "@/lib/schema/noteSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BackgroundPicker from "../Notes/BackGroundPicker";
import { Button } from "../shadcnui/button";
import { Field, FieldError } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Textarea } from "../shadcnui/textarea";

const QuickNoteForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<NoteType>({
    resolver: zodResolver(noteSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",
      backgroundId: null,
    },
  });

  const title = watch("title");
  const content = watch("content");
  const backgroundId = watch("backgroundId");
  const backgroundImage = getBackgroundImage(backgroundId ?? null);

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        if (!title && !content) {
          setIsExpanded(false);
          reset();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded, title, content, reset]);

  const onSubmit = async (data: NoteType) => {
    if (!data.content?.trim()) return;

    const result = await createNoteAction({
      title: data.title ?? null,
      content: data.content,
      backgroundId: data.backgroundId,
    });

    if (result.isSuccess) {
      reset({ title: "", content: "", backgroundId: null });
      setIsExpanded(false);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to create note");
      console.error(result.message);
    }
  };
  const handleClose = () => {
    const hasContent = title?.trim() || content?.trim();

    if (hasContent && !confirm("Discard unsaved note?")) {
      return;
    }

    setIsExpanded(false);
    reset({ title: "", content: "", backgroundId: null });
  };
  return (
    <div className="mx-auto mb-8 w-full max-w-2xl">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "bg-card relative isolate rounded-lg border shadow-sm transition-all",
          isExpanded && "ring-border ring-1",
        )}
        noValidate>
        {isExpanded && backgroundImage && (
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="bg-background/70 absolute inset-0" />
          </div>
        )}

        {isExpanded && (
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="title"
                  placeholder="Title"
                  className="border-0 bg-transparent focus-visible:ring-0"
                  aria-invalid={fieldState.invalid}
                  autoFocus
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        )}

        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                id="content"
                placeholder="Take a note..."
                onFocus={() => setIsExpanded(true)}
                className={cn(
                  "resize-none border-0 bg-transparent focus-visible:ring-0",
                  !isExpanded ? "min-h-[40px]" : "min-h-[100px]",
                )}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {isExpanded && (
          <div className="flex flex-col gap-3 p-3">
            <Controller
              name="backgroundId"
              control={control}
              render={({ field }) => (
                <BackgroundPicker
                  value={field.value ?? null}
                  onChange={field.onChange}
                />
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isSubmitting}>
                Close
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !content?.trim()}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuickNoteForm;
