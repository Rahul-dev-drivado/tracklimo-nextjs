import { z } from "zod";
import { forgotPasswordSchema } from "@/stores/server/auth/schema";

export const forgotPasswordFormSchema = forgotPasswordSchema;

export type ForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>;

export const DEFAULT_FORGOT_PASSWORD_VALUES: ForgotPasswordForm = {
  email: "",
};
