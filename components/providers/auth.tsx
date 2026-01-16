"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryError } from "@/lib/react-query/helpers";
import { affiliateDetailsQueryOptions } from "@/stores/server/auth/query";

type AuthProviderProps = React.PropsWithChildren & {
  config: {
    skeleton: React.ReactNode;
  };
};

const authRetryLogicFn = (failureCount: number, error: ReactQueryError) => {
  if (!error.status) {
    return true;
  }

  if (error.status >= 400) {
    return false;
  }

  return failureCount < 3; // retries 3 times (failureCount starts at 0)
};

export function AuthProvider(props: AuthProviderProps) {
  const {
    children,
    config: { skeleton },
  } = props;

  const router = useRouter();
  const { data, isPending, error, isError } = useQuery({
    ...affiliateDetailsQueryOptions(),
    retry: authRetryLogicFn,
  });

  React.useEffect(() => {
    if (!isError || !error) {
      return;
    }

    // Note: Toaster and Navigation side effects should
    // run after changes has been commited to the screen.
    toast.error(error.message);
    router.replace("/auth/login");
  }, [isError, error, router]);

  if (isPending || isError || !data) {
    return skeleton;
  }

  return children;
}
