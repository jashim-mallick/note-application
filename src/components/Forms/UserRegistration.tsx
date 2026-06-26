"use client";

import { registerFormSchema } from "@/lib/schema/zodSchema";
import { RegisterType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderIcon, SendIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const UserRegistration = () => {
  //   const { push } = useRouter();

  const {
    handleSubmit,
    control,
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

  const handleRegister = async (rData: RegisterType) => {
    console.log(rData);

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
            <Input
              {...field}
              id="password"
              type="password"
              placeholder="password"
              aria-invalid={!!fieldState.invalid}
            />
            {fieldState.error && (
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
            <Input
              {...field}
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              aria-invalid={!!fieldState.invalid}
            />
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

export default UserRegistration;
