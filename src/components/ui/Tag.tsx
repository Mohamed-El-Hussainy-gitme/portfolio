import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Tag({ children, className = "" }: Props) {
  return (
    <span
      className={
        `inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-200 ${className}`.trim()
      }
    >
      {children}
    </span>
  );
}
