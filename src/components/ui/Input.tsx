import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({ label, hint, error, containerClassName, className, id, ...props }: InputProps) {
  return (
    <label className={cn("field", containerClassName)} htmlFor={id}>
      {label ? <span className="field-label">{label}</span> : null}
      <input id={id} className={cn("ui-input", error && "is-error", className)} {...props} />
      {error ? <span className="field-error">{error}</span> : null}
      {!error && hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}
