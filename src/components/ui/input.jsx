import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  console.log(props,"props");
  return (
    <>
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        maxLength={props.max}
        name={props.name}
        value={props.value}
        {...props?.formik?.getFieldProps(props.name)}
        {...props}
        ref={ref}
      />
      {props?.formik?.touched[props.name] && (
        <span className="text-red-500 text-xs">
          {props?.formik?.errors[props.name]}
        </span>
      )}
    </>
  );
});
Input.displayName = "Input";

export { Input };
