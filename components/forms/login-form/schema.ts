import { z } from "zod";
import { loginSchema } from "@/stores/server/auth/schema";

export const loginFormSchema = loginSchema.omit({ companyid: true }).extend({
  companyId: z.string().min(1, "Company ID is required"),
  consent: z.boolean().refine((val) => val),
});

export type LoginForm = z.infer<typeof loginFormSchema>;

export const DEFAULT_LOGIN_VALUES: LoginForm = {
  companyId: "",
  username: "",
  password: "",
  consent: false,
};
