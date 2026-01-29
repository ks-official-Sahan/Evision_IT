import React from "react"
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main";
  size?: "default" | "sm" | "lg" | "full";
}

export function Container({
  as: Component = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-5xl": size === "sm",
          "max-w-7xl": size === "default",
          "max-w-[90rem]": size === "lg",
          "max-w-none": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
