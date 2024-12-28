"use client";

import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}: CardProps): JSX.Element {
  const baseStyles = "rounded-lg";
  const variantStyles = {
    default: "bg-white shadow-md",
    bordered: "border border-gray-200",
  };
  const paddingStyles = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`;

  return (
    <div {...props} className={combinedClassName}>
      {children}
    </div>
  );
}
