import React from "react";
import { Control, FieldPath } from "react-hook-form";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LoginForm } from "./schema";
import { cn } from "@/lib/utils";

type InputPasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  control: Control<LoginForm>;
  name: Exclude<FieldPath<LoginForm>, "consent" | "username" | "companyId">;
};

export function InputPasswordField(props: InputPasswordFieldProps) {
  const { control, name, className, ...rest } = props;

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const makePassWordVisible = () => setIsPasswordVisible(true);
  const makePassWordInvisible = () => setIsPasswordVisible(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="gap-1">
          <FormLabel className="sr-only">Password</FormLabel>
          <div className="relative">
            <FormControl>
              <div className="relative">
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  className={cn(
                    "bg-input/30 h-auto px-2 py-3 text-white [--input:oklch(1_0_0/15%)] [--muted-foreground:oklch(0.705_0.015_286.067)] focus-visible:ring-0",
                    error ? "border pr-20" : "pr-12",
                    className,
                  )}
                  aria-invalid={!!error}
                  {...rest}
                  {...field}
                />

                <div className="absolute inset-y-0 right-4 flex items-center gap-4">
                  <Button
                    type="button"
                    onClick={
                      isPasswordVisible
                        ? makePassWordInvisible
                        : makePassWordVisible
                    }
                    className="bg-transparent hover:cursor-pointer hover:bg-transparent has-[>svg]:px-0"
                    aria-pressed={isPasswordVisible}
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    title={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {isPasswordVisible ? (
                      <Eye className="size-4 text-white" />
                    ) : (
                      <EyeOff className="size-4 text-white" />
                    )}
                  </Button>

                  {error && (
                    <Button
                      type="button"
                      className="bg-transparent hover:bg-transparent has-[>svg]:px-0"
                      title={"Password Required"}
                    >
                      <CircleAlert
                        aria-hidden="true"
                        className="text-destructive size-4"
                      />
                    </Button>
                  )}
                </div>
              </div>
            </FormControl>
          </div>

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
