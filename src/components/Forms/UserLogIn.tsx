"use client";

import { logInFormSchema } from "@/lib/schema/zodSchema";
import { LogInType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const UserLogIn = () => {
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

  const handleLogIn = async (lData: LogInType) => {
    console.log(lData);
    reset();
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
            <Input
              {...field}
              id="password"
              type="password"
              placeholder="Password"
              aria-invalid={!!fieldState.invalid}
            />
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
            <LoaderIcon className="animate-spin" />
            submitting..
          </>
        : <>
            <SendIcon /> submit
          </>
        }
      </Button>
    </form>
  );
};

export default UserLogIn;
