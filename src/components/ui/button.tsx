import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90",
        outline:
          "border-2 border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        game: "bg-primary text-primary-foreground font-game uppercase tracking-wider shadow-lg box-glow hover:bg-primary/90 hover:scale-[1.05] active:scale-[0.98] transition-all duration-200",
        gameOutline: "border-2 border-primary bg-transparent text-primary font-game uppercase tracking-wider hover:bg-primary/20 hover:scale-[1.02] transition-all duration-200",
        success: "bg-success text-success-foreground shadow-lg box-glow-success hover:bg-success/90",
        option: "bg-secondary/80 text-foreground border border-border hover:bg-primary/20 hover:border-primary/50 hover:scale-[1.01] transition-all duration-200 text-left justify-start",
        optionCorrect: "bg-success/20 text-success border-2 border-success box-glow-success",
        optionIncorrect: "bg-destructive/20 text-destructive border-2 border-destructive box-glow-error shake",
        optionDisabled: "bg-secondary/30 text-muted-foreground border border-border/50 cursor-not-allowed opacity-60",
        wildcard: "bg-secondary border border-primary/30 text-foreground hover:bg-primary/20 hover:border-primary hover:scale-[1.05] transition-all duration-200",
        wildcardUsed: "bg-secondary/30 border border-border/30 text-muted-foreground cursor-not-allowed opacity-40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
        option: "min-h-16 px-5 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
