import React from "react";
import Link from "next/link";
import { Control, FieldPath } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

import type { LoginForm } from "./schema";
import { cn } from "@/lib/utils";
import { linkFactory } from "@/lib/link-factory";

type InputCheckboxFieldProps = React.HTMLAttributes<HTMLButtonElement> & {
  control: Control<LoginForm>;
  name: Exclude<FieldPath<LoginForm>, "username" | "companyId" | "password">;
};

export function InputCheckboxField(props: InputCheckboxFieldProps) {
  const { control, name, className, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormField
            control={control}
            name="consent"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-start gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={cn(
                        "bg-input/30 [--input:oklch(1_0_0/15%)] hover:cursor-pointer data-[state=checked]:text-white data-[state=checked]:[--primary:var(--color-blue-900)]",
                        className,
                      )}
                      {...rest}
                    />
                  </FormControl>
                  <Label className="text-xs leading-[1.3] font-normal text-white">
                    <span>
                      I have read and agreed to the{" "}
                      <Link
                        target="_blank"
                        href={`/${linkFactory.static.termsAndConditionsLinks.all().join("/")}`}
                        className="inline-block underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      &{" "}
                      <Link
                        target="_blank"
                        href={`/${linkFactory.static.privacyPolicyLinks.all().join("/")}`}
                        className="inline-block underline"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </Label>
                </FormItem>
              );
            }}
          />
        </FormItem>
      )}
    />
  );
}
