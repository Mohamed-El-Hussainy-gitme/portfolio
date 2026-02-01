import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
};

export default function SectionHeading({ title, subtitle, align = "left", className = "" }: Props) {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300" style={{ unicodeBidi: "plaintext" }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
