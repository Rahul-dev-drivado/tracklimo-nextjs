import { server } from "..";
import { mutationOptions } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEYS } from "@/config/LOCAL_STORAGE_KEYS";

export const affiliateLoginMutationOptions = () =>
  mutationOptions({
    mutationFn: server.auth.affiliateLogin,
  });

export const affiliateLogoutMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: { email: string }) => {
      const data = await server.auth.affiliateLogout(params);

      if (localStorage.getItem(LOCAL_STORAGE_KEYS.auth.accessToken)) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.auth.accessToken);
      }

      return data;
    },
  });
