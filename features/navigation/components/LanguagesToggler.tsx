"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "fr" | "en";

const LANGUAGES = {
  fr: {
    label: "Français",
    flag: "/icons/fr.png",
  },
  en: {
    label: "English",
    flag: "/icons/en.png",
  },
} as const;

function Flag({ src }: { src: string }) {
  return (
    <span className="relative block h-5 w-7 overflow-hidden rounded-[3px]">
      <Image
        src={src}
        alt=""
        fill
        sizes="28px"
        className="object-cover"
      />
    </span>
  );
}

export default function LanguagesToggler({
  className,
}: {
  className?: string;
}) {
  const [language, setLanguage] =
    React.useState<Language>("en");

  const [open, setOpen] = React.useState(false);

  const changeLanguage = (newLanguage: Language) => {
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;

    if (!select) {
      console.error(
        "Google Translate selector (.goog-te-combo) not found.",
      );

      return;
    }

    select.value = newLanguage;

    select.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );

    setLanguage(newLanguage);
    setOpen(false);
  };

  const active = LANGUAGES[language];

  const otherLanguage: Language =
    language === "fr" ? "en" : "fr";

  const other = LANGUAGES[otherLanguage];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-border/60 bg-background/90 px-2.5 py-1.5 shadow-sm transition hover:bg-accent"
      >
        <Flag src={active.flag} />

        <span className="hidden text-sm font-medium sm:block">
          {active.label}
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-[9999] mt-2 origin-top-right transition-all duration-200",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => changeLanguage(otherLanguage)}
          className="flex min-w-[150px] items-center gap-3 rounded-xl border border-border/60 bg-background px-3 py-2.5 shadow-xl transition hover:bg-accent"
        >
          <Flag src={other.flag} />

          <span className="text-sm font-medium">
            {other.label}
          </span>
        </button>
      </div>
    </div>
  );
}