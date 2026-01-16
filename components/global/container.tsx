import React from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-4 block md:mx-10 2xl:mx-auto 2xl:max-w-7xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
