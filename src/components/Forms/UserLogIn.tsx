"use client";

import logInAction from "@/hooks/logInAction";
import { logInFormSchema } from "@/lib/schema/zodSchema";
import { LogInType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, Send } from "lucide-react";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const UserLogIn = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<LogInType>({
    resolver: zodResolver(logInFormSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const getSafeCallback = (callback: string | null): string => {
    if (!callback) return "/studio";
    try {
      const currentOrigin = window.location.origin;
      const resolvedUrl = new URL(callback, currentOrigin);

      if (resolvedUrl.origin === currentOrigin) {
        return resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
      }
    } catch (e) {
      console.error("Invalid callback URL:", e);
    }
    return "/studio";
  };

  const handleLogIn = async (lData: LogInType) => {
    const { success, message } = await logInAction(lData);

    if (success) {
      toast.success(message);
      reset();

      const callback = searchParams.get("callbackUrl");

      const safeCallback = getSafeCallback(callback) as Route;

      push(safeCallback);
    } else {
      console.error(message);
      toast.error(message);
    }
  };

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(handleLogIn)}
      className="mx-auto grid w-full max-w-sm gap-4 rounded-lg pb-2"
      noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="john@gmail.com"
              aria-invalid={!!fieldState.invalid}
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                aria-invalid={!!fieldState.invalid}
                className="pr-10"
                onBlur={field.onBlur}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 flex items-center transition-colors focus-visible:outline-none">
                {showPassword ?
                  <EyeOff className="size-4" />
                : <Eye className="size-4" />}
              </button>
            </div>

            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="rememberMe"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={field.value}
                onCheckedChange={(val) => field.onChange(!!val)}
                className="cursor-pointer"
              />
              <FieldLabel
                htmlFor="rememberMe"
                className="cursor-pointer">
                Remember Me
              </FieldLabel>
            </div>
          </Field>
        )}
      />

      <Button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2"
        disabled={isSubmitting}>
        {isSubmitting ?
          <>
            <Loader className="animate-spin" />
            submitting..
          </>
        : <>
            <Send /> submit
          </>
        }
      </Button>
    </form>
  );
};

export default UserLogIn;
