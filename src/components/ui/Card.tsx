import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export function Card({ title, subtitle, action, className, children, ...props }: CardProps) {
  return (
    <section className={cn("ui-card glass-panel", className)} {...props}>
      {title || subtitle || action ? (
        <header className="ui-card-head">
          <div>
            {title ? <h3 className="ui-card-title">{title}</h3> : null}
            {subtitle ? <p className="ui-card-subtitle">{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </header>
      ) : null}
      <div className="ui-card-content">{children}</div>
    </section>
  );
}

