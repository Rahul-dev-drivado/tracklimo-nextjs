import { CircleAlert } from "lucide-react";
import { Control, FieldPath } from "react-hook-form";
import type { LoginForm } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type InputTextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  control: Control<LoginForm>;
  name: Exclude<FieldPath<LoginForm>, "consent" | "password">;
};

export function InputTextField(props: InputTextFieldProps) {
  const { control, name, className, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem className="gap-1">
            <div className="relative">
              <FormLabel className="sr-only">Company ID</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    "bg-input/30 h-auto px-2 py-3 text-white [--input:oklch(1_0_0/15%)] [--muted-foreground:oklch(0.705_0.015_286.067)] focus-visible:ring-0",
                    error && "pr-12",
                    className,
                  )}
                  aria-invalid={!!error}
                  {...rest}
                  {...field}
                />
              </FormControl>
              {error && (
                <Button
                  type="button"
                  className="text-destructive absolute top-1/2 right-4 size-4 -translate-y-1/2 bg-transparent hover:bg-transparent has-[>svg]:px-0"
                  title={"Company ID Required"}
                >
                  <CircleAlert
                    aria-hidden="true"
                    className="text-destructive size-4"
                  />
                </Button>
              )}
            </div>

            <FormMessage className="text-xs" />
          </FormItem>
        );
      }}
    />
  );
}
