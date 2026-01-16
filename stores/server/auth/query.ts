import { server } from "..";
import { queryOptions } from "@tanstack/react-query";
import { ReactQueryError } from "@/lib/react-query/helpers";
import { LOCAL_STORAGE_KEYS } from "@/config/LOCAL_STORAGE_KEYS";

const authQueryKeys = {
  all: () => ["auth"], // should be prefixed in every auth key
  affiliate: () => ["affiliate"],
  affiliateDetails: () => [
    ...authQueryKeys.all(),
    ...authQueryKeys.affiliate(),
    "details",
  ],
};

export const affiliateDetailsQueryOptions = () =>
  queryOptions({
    queryKey: authQueryKeys.affiliateDetails(),
    queryFn: async () => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.auth.accessToken);

      if (!token) {
        throw new ReactQueryError({
          message: "Authentication Expired",
          status: 401,
        });
      }

      return server.auth.affiliateDetails({
        token,
      });
    },
  });
