// components/hero-decor.tsx
// Pure CSS/Tailwind decoration. No dependencies, uses your theme's `primary` color
// and works in light and dark mode.

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Background: faded grid + two soft glows + a few medical crosses     */
/* ------------------------------------------------------------------ */

const fade = "radial-gradient(ellipse 75% 65% at 50% 35%, #000 25%, transparent 100%)";

export function HeroBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden text-primary", className)}
    >
      {/* Grid — lines use currentColor (primary) at low opacity, faded toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, currentColor 10%, transparent) 1px, transparent 1px)," +
            "linear-gradient(to bottom, color-mix(in srgb, currentColor 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
      />

      {/* Glow, top-left (behind the text) */}
      <div
        className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-primary/20 blur-3xl motion-safe:animate-pulse"
        style={{ animationDuration: "7s" }}
      />

      {/* Glow, right (behind the cover photo) */}
      <div
        className="absolute -right-20 top-1/3 size-[26rem] rounded-full bg-emerald-400/20 blur-3xl motion-safe:animate-pulse"
        style={{ animationDuration: "9s" }}
      />

      {/* Pharmacy crosses */}
      <Cross className="left-[8%] top-[18%] size-5 opacity-30" />
      <Cross className="right-[12%] top-[10%] size-4 opacity-25" />
      <Cross className="bottom-[14%] left-[46%] hidden size-6 opacity-20 md:block" />
      <Cross className="bottom-[22%] right-[6%] hidden size-4 opacity-25 md:block" />

      {/* Bottom fade so the section blends into the page */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
    </div>
  );
}

function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("absolute", className)} fill="currentColor">
      <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Full-bleed wrapper: background + a centered content container       */
/* ------------------------------------------------------------------ */

export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroBackground />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-10 md:py-8 rounded-4xl">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Glow frame for the cover photo                                      */
/* ------------------------------------------------------------------ */

export function GlowFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* soft halo */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 via-emerald-400/10 to-transparent blur-2xl"
      />
      {/* offset outline for depth */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-primary/30"
      />
      <div className="relative">{children}</div>
    </div>
  );
}