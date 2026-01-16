import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <h2 className="max-lg:hidden">
        <span className="text-3xl leading-tight! font-thin tracking-tight text-balance text-gray-300 text-shadow-lg 2xl:text-4xl">
          Hello,
        </span>
        <br />
        <span className="text-4xl leading-tight! font-medium text-pretty text-white text-shadow-lg 2xl:text-5xl">
          Welcome Back!
        </span>
      </h2>

      <LoginForm className="mx-auto lg:mr-0" />
    </div>
  );
}
