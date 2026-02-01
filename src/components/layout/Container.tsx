import React from "react";

type ContainerTag = "div" | "section" | "main" | "header" | "footer" | "article";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: ContainerTag;
};

export default function Container({ children, className = "", as = "div" }: Props) {
  const Tag = as as any;

  return (
    <Tag className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </Tag>
  );
}
