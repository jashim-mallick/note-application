import z from "zod";

export const passwordRules = [
  {
    key: "minLength",
    label: "At least 8 characters",
    test: (val: string) => val.length >= 8,
  },
  {
    key: "uppercase",
    label: "One uppercase letter (A–Z)",
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    key: "lowercase",
    label: "One lowercase letter (a–z)",
    test: (val: string) => /[a-z]/.test(val),
  },
  {
    key: "number",
    label: "One number (0–9)",
    test: (val: string) => /[0-9]/.test(val),
  },
  {
    key: "special",
    label: "One special character (!@#$...)",
    test: (val: string) => /[^A-Za-z0-9]/.test(val),
  },
] as const;

const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Minimum 2 characters required")
      .max(16, "Maximum 16 characters allowed"),

    email: z.string().email("Invalid email address"),

    password: strongPassword,

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const logInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: strongPassword,
  rememberMe: z.boolean(),
});
