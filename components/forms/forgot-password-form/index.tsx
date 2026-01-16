"use client";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordFormSchema,
  DEFAULT_FORGOT_PASSWORD_VALUES,
} from "./schema";
import type { ForgotPasswordForm } from "./schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { cn, getErrorMessage } from "@/lib/utils";
import { ReactQueryError } from "@/lib/react-query/helpers";

import { SendButton } from "./send-button";
import { InputTextField } from "./input-text-field";
import { GoToLoginPageButton } from "./go-to-login-page-button";
import { requestAffiliatePasswordChangeMutationOptions } from "@/stores/server/auth/mutation";

type LoginFormProps = React.ComponentProps<"div">;

export function ForgotPasswordForm({ className, ...props }: LoginFormProps) {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: DEFAULT_FORGOT_PASSWORD_VALUES,
  });

  const { mutateAsync: requestAffiliatePasswordChangeAsync } = useMutation({
    ...requestAffiliatePasswordChangeMutationOptions(),
  });

  async function handleSubmit(data: ForgotPasswordForm) {
    try {
      const response = await requestAffiliatePasswordChangeAsync(data);
      toast(response.message);
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
        <CardTitle className="text-xl text-white">Forgot Password</CardTitle>
        <CardDescription className="[--muted-foreground:var(--color-gray-200)]">
          Please enter your email!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="grid space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <InputTextField
              name="email"
              placeholder="example@abc.com"
              control={form.control}
            />
            <SendButton />
            <GoToLoginPageButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
