import React from "react";

type GlowCardTag = "div" | "section" | "article";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: GlowCardTag;
};

export default function GlowCard({ children, className = "", as = "div" }: Props) {
  const Tag = as as any;

  return (
    <Tag
      className={(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-sm backdrop-blur " +
        className
      ).trim()}
    >
      {/* subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-32 rounded-full bg-gradient-to-r from-cyan-400/10 via-indigo-400/10 to-sky-400/10 blur-3xl"
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}

// ✅ Named export support
export { GlowCard };
