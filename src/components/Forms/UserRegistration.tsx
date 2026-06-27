"use client";

import { registerFormSchema } from "@/lib/schema/zodSchema";
import { RegisterType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff, Loader, Send } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import PasswordChecklist from "./PasswordChecklist";

const UserRegistration = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm<RegisterType>({
    resolver: zodResolver(registerFormSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (rData: RegisterType) => {
    // TODO: Implement actual registration logic using better-auth
    reset();
  };

  return (
    <form
      id="registerForm"
      onSubmit={handleSubmit(handleRegister)}
      className="mx-auto grid w-full max-w-sm gap-3 rounded-lg"
      noValidate>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.invalid}>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              {...field}
              id="name"
              placeholder="Full Name"
              aria-invalid={!!fieldState.invalid}
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

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
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {
                  field.onBlur();
                  setIsPasswordFocused(false);
                }}
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

            <PasswordChecklist
              value={passwordValue}
              isFocused={isPasswordFocused}
            />
            {fieldState.error && !passwordValue && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.invalid}>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                aria-invalid={!!fieldState.invalid}
                className="pr-10"
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword ?
                    "Hide confirm password"
                  : "Show confirm password"
                }
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 flex items-center transition-colors focus-visible:outline-none">
                {showConfirmPassword ?
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

      <Button
        type="submit"
        className="cursor-pointer"
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

export default UserRegistration;
