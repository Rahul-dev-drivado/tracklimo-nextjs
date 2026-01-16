import { z } from "zod";

import {
  loginSchema,
  nLoginResponseSchema,
  nLogoutResponseSchema,
  forgotPasswordSchema,
  forgotPasswordResponseSchema as forgotPasswordRS,
  nAffiliateDetailsResponseSchema as nAffiliateDetailsRS,
} from "./schema";

export type LoginRequest = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof nLoginResponseSchema>;
export type LogoutResponse = z.infer<typeof nLogoutResponseSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordResponse = z.infer<typeof forgotPasswordRS>;
export type AffiliateDetailsResponse = z.infer<typeof nAffiliateDetailsRS>;
