import {
  isServer,
  QueryKey,
  QueryClient,
  MutationCache,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

import { ReactQueryError } from "./helpers";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ReactQueryError;
    mutationMeta: {
      invalidatesQuery?: QueryKey;
    };
  }
}

function makeQueryClient() {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSettled: (_data, _error, _variables, _ctx, mutation) => {
        if (mutation.meta?.invalidatesQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta?.invalidatesQuery,
          });
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
