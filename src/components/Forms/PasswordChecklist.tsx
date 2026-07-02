"use client";

import { passwordRules } from "@/lib/schema/zodSchema";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import { CheckCircle2, Circle } from "lucide-react";

interface PasswordChecklistProps {
  value: string;
  isFocused: boolean;
}

const ChecklistItems = ({ value }: { value: string }) => (
  <ul className="grid gap-1.5">
    {passwordRules.map(({ key, label, test }) => {
      const passed = test(value);
      return (
        <li
          key={key}
          className={cn(
            "flex items-center gap-2 text-xs font-medium transition-colors duration-200",
            passed ?
              "text-emerald-500 dark:text-emerald-400"
            : "text-muted-foreground",
          )}>
          {passed ?
            <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
          : <Circle className="size-3.5 shrink-0" />}
          {label}
        </li>
      );
    })}
  </ul>
);

const PasswordChecklist = ({ value, isFocused }: PasswordChecklistProps) => {
  if (!value) return null;

  return (
    <>
      <div className="border-border bg-muted/40 rounded-md border px-3 py-2.5 md:hidden">
        <ChecklistItems value={value} />
      </div>

      <div className="">
        <Popover.Root open={isFocused && !!value}>
          <Popover.Anchor asChild>
            <span
              className="block h-0 w-full"
              aria-hidden="true"
              tabIndex={-1}
            />
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              side="right"
              align="center"
              sideOffset={20}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
              className="border-border bg-popover z-50 w-56 rounded-lg border px-4 py-3 shadow-lg">
              <p className="text-muted-foreground mb-2.5 text-xs font-semibold tracking-wide uppercase">
                Password must contain
              </p>
              <ChecklistItems value={value} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </>
  );
};

export default PasswordChecklist;
