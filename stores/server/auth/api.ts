import { API_VERSION_V1 } from "@/config/API_VERSION";
import { getEnvDrivadoBackendURL } from "@/config/ENV";
import { ReactQueryError } from "@/lib/react-query/helpers";

import {
  nLoginResponseSchema,
  nLogoutResponseSchema,
  nAffiliateDetailsResponseSchema,
  loginErrorSchema,
  logoutErrorSchema,
  affiliateDetailsErrorSchema,
  forgotPasswordErrorSchema,
  forgotPasswordResponseSchema,
} from "./schema";

import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  AffiliateDetailsResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "./types";

export const auth = {
  affiliateLogin: async ({
    input,
  }: {
    input: LoginRequest;
  }): Promise<LoginResponse> => {
    // Step 0: Creating the Endpoint
    const URL = `${getEnvDrivadoBackendURL()}/api/${API_VERSION_V1}/affiliates/affiliateLogin`;

    // Step 1: Try to login over the fetch call
    const response = await fetch(URL, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Step 2: Parsing the incoming JSON
    const data: unknown = await response.json();

    // Step 3: handling status 400 and 500 situation
    if (!response.ok) {
      const validatedError = loginErrorSchema.safeParse(data);

      if (validatedError.success) {
        throw new ReactQueryError({
          message: validatedError.data.message,
          status: response.status,
        });
      }

      throw new ReactQueryError({
        message: "error occur while login",
        status: response.status,
      });
    }

    // Step 4: validating the integrity of the incoming data
    const validatedData = nLoginResponseSchema.safeParse(data);

    // Step 5: throwing error if the format of the incoming data is not appropriate
    if (!validatedData.success) {
      throw new ReactQueryError({ message: "server error" });
    }

    // Step 6: Returning tokens because affiliate has provided credentials
    return validatedData.data;
  },
  affiliateDetails: async ({
    token,
  }: {
    token: string;
  }): Promise<AffiliateDetailsResponse> => {
    // Step 0: Creating the Endpoint
    const URL = `${getEnvDrivadoBackendURL()}/api/${API_VERSION_V1}/affiliates/@me`;
    const headers = {
      Authorization: token,
    };

    // Step 1: Try to fetch affiliate detail over the fetch call
    const response = await fetch(URL, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers,
    });

    // Step 2: Parsing the incoming JSON
    const data: unknown = await response.json();

    // Step 3: handling status 400 and 500 situation
    if (!response.ok) {
      const validatedError = affiliateDetailsErrorSchema.safeParse(data);

      if (validatedError.success) {
        throw new ReactQueryError({
          // message: validatedError.data.message, // Right now: Message is not according to the requirement
          message: "Authentication Expired",
          status: response.status,
        });
      }

      throw new ReactQueryError({
        message: "error occur while fetching affiliate details",
        status: response.status,
      });
    }

    // Step 4: validating the integrity of the incoming data
    const validatedData = nAffiliateDetailsResponseSchema.safeParse(data);

    // Step 5: throwing error if the format of the incoming data is not appropriate
    if (!validatedData.success) {
      throw new ReactQueryError({ message: "server error" });
    }

    // Step 6: Returning affiliate details
    return validatedData.data;
  },
  affiliateLogout: async ({
    email,
  }: {
    email: string;
  }): Promise<LogoutResponse> => {
    // Step 0: Creating the Endpoint
    const URL = `${getEnvDrivadoBackendURL()}/api/${API_VERSION_V1}/user/logout?affiliateEmail=${encodeURIComponent(email)}`;

    // Step 1: Try to logout affiliate
    const response = await fetch(URL, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });

    // Step 2: parsing the incoming JSON
    const data: unknown = await response.json();

    // Step 3: handling status 400 and 500 situation
    if (!response.ok) {
      const validatedError = logoutErrorSchema.safeParse(data);

      if (validatedError.success) {
        throw new ReactQueryError({
          message: validatedError.data.message,
          status: response.status,
        });
      }

      throw new ReactQueryError({
        message: "error occur while logging out affiliate",
        status: response.status,
      });
    }

    // Step 4: validating the integrity of the incoming data
    const validatedData = nLogoutResponseSchema.safeParse(data);

    // Step 5: throwing error if the format of the incoming data is not appropriate
    if (!validatedData.success) {
      throw new ReactQueryError({ message: "server error" });
    }

    // Step 6: Returning success message
    return validatedData.data;
  },
  requestAffiliatePasswordChange: async (
    body: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    // Step 0: Creating the Endpoint
    const URL = `${getEnvDrivadoBackendURL()}/api/${API_VERSION_V1}/affiliates/forgotPassword`;

    // Step 1: Try to reset link
    const response = await fetch(URL, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Step 2: parsing the incoming JSON
    const data: unknown = await response.json();

    // Step 3: handling status 400 and 500 situation
    if (!response.ok) {
      const validatedError = forgotPasswordErrorSchema.safeParse(data);

      if (validatedError.success) {
        throw new ReactQueryError({
          message: validatedError.data.message,
          status: response.status,
        });
      }

      throw new ReactQueryError({
        message: "error occur resetting the password",
        status: response.status,
      });
    }

    // Step 4: validating the integrity of the incoming data
    const validatedData = forgotPasswordResponseSchema.safeParse(data);

    // Step 5: throwing error if the format of the incoming data is not appropriate
    if (!validatedData.success) {
      throw new ReactQueryError({ message: "server error" });
    }

    // Step 6: Returning success message
    return validatedData.data;
  },
};
