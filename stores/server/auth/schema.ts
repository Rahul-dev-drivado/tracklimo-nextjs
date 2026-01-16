// NOTE: n in front of schema name stands for normalize
import { z } from "zod";

// LOGIN SCHEMAS
export const loginSchema = z.object({
  companyid: z.string().min(1, "Company ID is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const nLoginSchema = loginSchema.transform((d) => ({
  username: d.username,
  password: d.password,
  companyId: d.companyid,
}));

// AFFILIATE SCHEMAS
const affiliateSchema = z.object({
  _id: z.string(),
  logo: z.object({
    id: z.string(),
    secure_url: z.string(),
  }),
  affiliateName: z.string(),
  email1: z.string(),
  companyid: z.string(),
});

export const nAffiliateSchema = affiliateSchema.transform((d) => ({
  id: d._id,
  companyId: d.companyid,
  affiliateName: d.affiliateName,
  email: d.email1,
  logo: {
    id: d.logo.id,
    secureUrl: d.logo.secure_url,
  },
}));

// LOGIN_RESPONSE SCHEMAS
const loginResponseSchema = z.object({
  refresh_Token: z.string().min(1),
  access_Token: z.string().min(1),
  message: z.string().min(1),
});

export const nLoginResponseSchema = loginResponseSchema.transform((d) => ({
  accessToken: d.access_Token,
  refreshToken: d.refresh_Token,
  message: d.message,
}));

// LOGOUT_RESPONSE SCHEMAS
const logoutResponseSchema = z.object({
  message: z.string(),
});

export const nLogoutResponseSchema = logoutResponseSchema;

// AFFILIATE_DETAILS_RESPONSE SCHEMAS
const affiliateDetailsResponseSchema = z.object({
  affiliateDetails: nAffiliateSchema,
});

export const nAffiliateDetailsResponseSchema =
  affiliateDetailsResponseSchema.transform((d) => ({ ...d.affiliateDetails }));

// SERVER_AUTH_ERROR_RESPONSE SCHEMAS
const errorSchema = z.object({ message: z.string() });
export const loginErrorSchema = errorSchema;
export const logoutErrorSchema = errorSchema;
export const affiliateDetailsErrorSchema = errorSchema;
