import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { LoginForm } from "./schema";

export function SubmitButton() {
  const form = useFormContext<LoginForm>();

  const hasGivenConsent = form.watch("consent");
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Button
      type="submit"
      disabled={!hasGivenConsent || isSubmitting}
      className="w-full py-5 text-white [--primary:var(--color-blue-900)] hover:cursor-pointer disabled:pointer-events-auto! disabled:cursor-not-allowed disabled:opacity-65"
    >
      {isSubmitting && <Loader2 className="animate-spin" />}
      <span>Login</span>
    </Button>
  );
}
