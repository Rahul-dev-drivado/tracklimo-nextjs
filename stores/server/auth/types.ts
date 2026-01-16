import { z } from "zod";

import {
  loginSchema,
  nLoginResponseSchema,
  nLogoutResponseSchema,
  nAffiliateDetailsResponseSchema as nAffiliateDetailsRS,
} from "./schema";

export type LoginRequest = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof nLoginResponseSchema>;
export type LogoutResponse = z.infer<typeof nLogoutResponseSchema>;
export type AffiliateDetailsResponse = z.infer<typeof nAffiliateDetailsRS>;
