import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { ForgotPasswordForm } from "./schema";

export function SendButton() {
  const form = useFormContext<ForgotPasswordForm>();
  const isSubmitting = form.formState.isSubmitting;

  const shouldDisable = isSubmitting;
  const isPending = isSubmitting;

  return (
    <Button
      type="submit"
      disabled={shouldDisable}
      className="w-full py-5 text-white [--primary:var(--color-blue-900)] hover:cursor-pointer disabled:pointer-events-auto! disabled:cursor-not-allowed disabled:opacity-65"
    >
      {isPending && <Loader2 className="animate-spin" />}
      <span>Send</span>
    </Button>
  );
}
