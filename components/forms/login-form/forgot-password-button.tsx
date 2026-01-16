import Link from "next/link";
import { Button } from "@/components/ui/button";
import { linkFactory } from "@/lib/link-factory";

export function ForgotPasswordButton() {
  return (
    <Button
      asChild
      className="h-auto bg-transparent p-0! text-xs tracking-wider text-gray-300 hover:bg-transparent hover:text-white"
    >
      <Link href={`/${linkFactory.authLinks.forgotPassword.all().join("/")}`}>
        Forgot Password
      </Link>
    </Button>
  );
}
