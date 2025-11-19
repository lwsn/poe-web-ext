import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../utils";

export const buttonVariants = cva(
  "relative text-main-foreground! p-1.5 text-center items-center justify-center flex gap-1.5 transition-color [disabled]:pointer-events-none [disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-main border border-main-border hover:bg-main-hover",
        secondary: "bg-secondary hover:bg-secondary-hover",
        ghost: "bg-transparent hover:bg-secondary-hover",
        destructive:
          "bg-red-800 hover:bg-red-700 border border-red-600 text-red-100!",
      },
      size: {
        sm: "",
        md: "min-h-9 min-w-9 [&>svg]:size-5",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
