import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <h2 className="sr-only">Forgot Password</h2>
      <div className="max-lg:hidden" aria-hidden="true" />
      <ForgotPasswordForm className="mx-auto lg:mr-0" />
    </div>
  );
}
