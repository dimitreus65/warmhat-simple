import React from "react";
import { cn } from "@/lib/utils"; // если хочешь оставить объединение классов

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
}

export const ButtonSimple: React.FC<ButtonProps> = ({
  variant = "solid",
  className = "",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost:
      "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
