import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl",
  {
    variants: {
      variant: {
        emerald: "bg-emerald-600 text-white hover:bg-emerald-700",
        coral: "bg-coral text-white hover:bg-coral/90",
        outline: "border-2 border-emerald-600 text-emerald-600 bg-transparent hover:bg-emerald-50",
        beige: "bg-beige text-charcoal hover:bg-beige/80",
      },
      size: {
        lg: "h-14 px-12 text-lg",
        full: "w-full h-14 text-lg",
      },
    },
    defaultVariants: {
      variant: "emerald",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };