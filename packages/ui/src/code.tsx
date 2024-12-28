"use client";

import * as React from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

export interface CodeProps {
  code: string;
  language?: string;
  className?: string;
}

export function Code({
  code,
  language = "javascript",
  className = "",
}: CodeProps): JSX.Element {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <pre className={`${className} language-${language}`}>
      <code>{code}</code>
    </pre>
  );
}
