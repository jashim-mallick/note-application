"use client";

import { getBackgroundImage } from "@/lib/backgrounds";
import { format } from "date-fns";
import { MoreVertical, Pencil, Pin, Trash2 } from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";

type NoteCardProps = {
  id: string;
  title: string | null;
  content: string;
  createdAt: Date | string;
  backgroundId?: string | null;
  isPinned?: boolean;
  onPinToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
};

const NoteCard = ({
  id,
  title,
  content,
  createdAt,
  backgroundId,
  isPinned = false,
  onPinToggle,
  onEdit,
  onDelete,
  isLoading = false,
}: NoteCardProps) => {
  const backgroundImage = getBackgroundImage(backgroundId ?? null);

  const excerpt =
    content.length > 120 ? content.slice(0, 120).trimEnd() + "…" : content;

  return (
    <Card className="group relative isolate flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="bg-background/70 absolute inset-0" />
        </div>
      )}

      <Link
        href={`/studio/notes/${id}` as Route}
        className="flex flex-1 flex-col"
        aria-label={`Open note: ${title ?? "Untitled"}${isPinned ? " (Pinned)" : ""}`}>
        <CardHeader className="flex items-center gap-1 px-4">
          <CardTitle className="line-clamp-1 text-base">
            {title?.trim() ? title : "Untitled"}
          </CardTitle>
          <span className="text-muted-foreground text-xs">
            {format(new Date(createdAt), "MMM d, yyyy")}
          </span>
        </CardHeader>
        <CardContent className="flex-1 pb-2">
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {excerpt}
          </p>
        </CardContent>
      </Link>

      {onPinToggle && (
        <div className="absolute top-2 right-2 z-30">
          <Button
            variant="ghost"
            size="icon"
            disabled={isLoading}
            className="bg-background/50 hover:bg-background/80 size-7 shrink-0 backdrop-blur-sm disabled:opacity-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPinToggle(id);
            }}
            aria-label={isPinned ? "Unpin note" : "Pin note"}>
            <Pin
              className={`size-4 transition-colors ${
                isPinned ?
                  "fill-amber-500 text-amber-500"
                : "text-muted-foreground hover:text-foreground"
              }`}
            />
          </Button>
        </div>
      )}

      <CardFooter className="relative z-30 flex items-center justify-end pt-2">
        <div className="absolute right-4 flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="text-muted-foreground hover:text-foreground bg-background/50 hover:bg-background/80 size-4 rounded-md backdrop-blur-sm"
              disabled={isLoading}
              aria-label="More options">
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="z-50 w-40"
              sideOffset={5}>
              {onEdit && (
                <DropdownMenuItem
                  disabled={isLoading}
                  className="cursor-pointer gap-2"
                  onClick={() => onEdit(id)}>
                  <Pencil className="size-3.5" />
                  Edit
                </DropdownMenuItem>
              )}

              {onEdit && onDelete && <DropdownMenuSeparator />}

              {onDelete && (
                <DropdownMenuItem
                  disabled={isLoading}
                  className="text-destructive focus:text-destructive cursor-pointer gap-2"
                  onClick={() => onDelete(id)}>
                  <Trash2 className="size-3.5" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
