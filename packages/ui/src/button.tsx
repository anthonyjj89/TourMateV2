"use client";

import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  appName?: string;
  className?: string;
}

export function Button({
  children,
  appName,
  className,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className={className}
      onClick={() => {
        alert(`Hello from ${appName || "your app"}!`);
      }}
    >
      {children}
    </button>
  );
}
