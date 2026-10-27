import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "purple" | "success" | "warning";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Button({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ActionLink({
  href,
  children,
  secondary = false,
  label,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""}`}
      aria-label={label}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action ? <div className="heading-action">{action}</div> : null}
    </div>
  );
}

export function Notice({
  title,
  children,
  warning = false,
}: {
  title: string;
  children: ReactNode;
  warning?: boolean;
}) {
  return (
    <div className={`notice ${warning ? "notice-warning" : ""}`}>
      <Info size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <div className="notice-copy">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  id,
  label,
  children,
  hint,
  required = false,
}: {
  id: string;
  label: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? (
          <span className="required-mark" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
