import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  containerClassName?: string;
  placeholder?: string;
}

export function Select({
  label,
  hint,
  error,
  options,
  containerClassName,
  className,
  id,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <label className={cn("field", containerClassName)} htmlFor={id}>
      {label ? <span className="field-label">{label}</span> : null}
      <select id={id} className={cn("ui-select", error && "is-error", className)} {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="field-error">{error}</span> : null}
      {!error && hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

