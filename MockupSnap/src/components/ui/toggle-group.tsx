"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

interface ToggleGroupContextValue extends VariantProps<typeof toggleVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
});

export interface ToggleGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleVariants> {
  type?: "single" | "multiple";
  value?: string;
  onValueChange?: (value: string) => void;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    { className, variant, size, value, onValueChange, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role="group"
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, value, onValueChange }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </div>
  )
);

ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, children, variant, size, value, onClick, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const isSelected = context.value === value;

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isSelected}
      data-state={isSelected ? "on" : "off"}
      onClick={(e) => {
        context.onValueChange?.(value);
        onClick?.(e);
      }}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };

