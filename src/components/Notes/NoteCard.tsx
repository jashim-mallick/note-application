import { getBackgroundImage } from "@/lib/backgrounds";
import { format } from "date-fns";
import { Pin, PinOff, Trash2 } from "lucide-react";
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

type NoteCardProps = {
  id: string;
  title: string | null;
  content: string;
  createdAt: Date | string;
  backgroundId?: string | null;
  isPinned?: boolean;
  onPinToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const NoteCard = ({
  id,
  title,
  content,
  createdAt,
  backgroundId,
  isPinned = false,
  onPinToggle,
  onDelete,
}: NoteCardProps) => {
  const backgroundImage = getBackgroundImage(backgroundId ?? null);

  const excerpt =
    content.length > 120 ? content.slice(0, 120).trimEnd() + "…" : content;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      {backgroundImage && (
        <>
          <div className="absolute inset-0 -z-10">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="bg-background/70 absolute inset-0 -z-10" />
        </>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-base">
            {title ?? "Untitled"}
          </CardTitle>
          {isPinned && <Pin className="size-4 shrink-0 text-amber-500" />}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <p className="text-muted-foreground line-clamp-3 text-sm">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <span className="text-muted-foreground text-xs">
          {format(new Date(createdAt), "MMM d, yyyy")}
        </span>

        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {onPinToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => onPinToggle(id)}
              aria-label={isPinned ? "Unpin note" : "Pin note"}>
              {isPinned ?
                <PinOff className="size-3.5" />
              : <Pin className="size-3.5" />}
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive size-7"
              onClick={() => onDelete(id)}
              aria-label="Delete note">
              <Trash2 className="size-3.5" />
            </Button>
          )}
        </div>
      </CardFooter>
      \
      <Link
        href={`/studio/notes/${id}`}
        className="absolute inset-0"
        aria-label={`Open note: ${title ?? "Untitled"}`}
      />
    </Card>
  );
};

export default NoteCard;
