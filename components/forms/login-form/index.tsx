"use client";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import type { LoginForm } from "./schema";
import { loginFormSchema, DEFAULT_LOGIN_VALUES } from "./schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { linkFactory } from "@/lib/link-factory";
import { cn, getErrorMessage } from "@/lib/utils";
import { ReactQueryError } from "@/lib/react-query/helpers";

import { LOCAL_STORAGE_KEYS } from "@/config/LOCAL_STORAGE_KEYS";

import { LoginRequest } from "@/stores/server/auth/types";
import { affiliateLoginMutationOptions } from "@/stores/server/auth/mutation";

import { SubmitButton } from "./submit-button";
import { InputTextField } from "./input-text-field";
import { InputPasswordField } from "./input-password-field";
import { InputCheckboxField } from "./input-checkbox-field";

type LoginFormProps = React.ComponentProps<"div">;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
  });

  const { mutateAsync: loginActionAsync } = useMutation({
    ...affiliateLoginMutationOptions(),
  });

  async function handleSubmit(data: LoginForm) {
    const input: LoginRequest = {
      companyid: data.companyId,
      username: data.username,
      password: data.password,
    };

    try {
      const tokens = await loginActionAsync({ input });

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.auth.accessToken,
        tokens.accessToken,
      );

      toast.success("Authenticated");
      router.push(`/${linkFactory.dashboardLinks.bookings.all().join("/")}`);
    } catch (error: unknown) {
      if (error instanceof ReactQueryError) {
        toast.error(error.message);
        return;
      }

      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Card
      className={cn(
        "w-full max-w-120 bg-slate-800/5 backdrop-blur-md [--border:oklch(1_0_0/10%)]",
        className,
      )}
      {...props}
    >
      <CardHeader className="gap-1">
        <CardTitle className="text-xl text-white">Login</CardTitle>
        <CardDescription className="[--muted-foreground:var(--color-gray-200)]">
          Just some details to get you in!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-(--gap) [--gap:1rem]">
              <InputTextField
                name="companyId"
                placeholder="Company ID"
                control={form.control}
              />

              <InputTextField
                name="username"
                placeholder="Username / Email ID"
                control={form.control}
              />

              <InputPasswordField
                name="password"
                placeholder="Password"
                control={form.control}
              />

              <div className="mt-4 space-y-(--gap)">
                <InputCheckboxField name="consent" control={form.control} />
                <SubmitButton />
              </div>

              <Button asChild className="text-center text-sm">
                <Link
                  href={`/${linkFactory.authLinks.forgotPassword.all().join("/")}`}
                  className="bg-transparent text-sm tracking-wider text-white hover:bg-transparent hover:underline"
                >
                  Forgot Password?
                </Link>
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-4 text-xs text-gray-300 md:mt-8">
          © Copyright 2024. Tracklimo Pvt Ltd. All rights reserved
        </p>
      </CardContent>
    </Card>
  );
}
