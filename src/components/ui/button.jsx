import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md uppercase xl:text-base md:text-sm text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-foreground shadow-none text-white hover:bg-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary text-primary bg-background shadow-none hover:bg-primary hover:text-white",
        secondary:
          "bg-secondary text-primary hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        card: "bg-primary-foreground  text-white hover:bg-primary",
        paginationButton: 'border border-primary text-white bg-primary-foreground shadow-none hover:bg-primary hover:text-white !rounded-full'
      },
      size: {
        default: "xl:px-12 md:px-9 px-6 xl:py-4 md:py-3 py-[10px]",
        sm: "rounded-md px-3 py-2",
        lg: "md:h-11 sm:h-10 h-9 rounded-md md:px-8 sm:px-6 px-4",
        icon: "h-10 w-10",
        card: "px-8 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
