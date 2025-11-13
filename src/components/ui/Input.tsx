import React from "react";
import { cn } from "@/lib/utils"; // или замени на cn(), если он у тебя остался

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error" | "disabled";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", variant = "default", disabled, ...props }, ref) => {
    const baseClasses =
      "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      default:
        "border-gray-300 focus:border-shop-blue-dark focus:ring-shop-blue-dark",
      error: "border-red-500 focus:border-red-500 focus:ring-red-500",
      disabled: "border-gray-200 bg-gray-100 cursor-not-allowed",
    };

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
