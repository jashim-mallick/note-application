import z from "zod";

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z.url({
    error: "NEXT_PUBLIC_BETTER_AUTH_URL must be a valid URL",
  }),
});

const clientEnvVars = {
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
};

export const clientEnv = clientEnvSchema.parse(clientEnvVars);
