import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-700 border border-transparent",
  secondary:
    "bg-transparent text-violet-600 hover:bg-violet-50 border border-violet-600",
  danger:
    "bg-red-600 text-white hover:bg-red-700 border border-transparent",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
