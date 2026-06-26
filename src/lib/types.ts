import z from "zod";
import { logInFormSchema, registerFormSchema } from "./schema/zodSchema";

export type RegisterType = z.infer<typeof registerFormSchema>;
export type LogInType = z.infer<typeof logInFormSchema>;
