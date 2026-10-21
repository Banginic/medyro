"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, LocateFixed, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroSection } from "@/features/pharmacy/components/admin/HeroBackground";

/* ---------- Copy (French first; swap here for English) ---------- */
const COPY = {
  title: "Find the nearest pharmacy close to you.",
  subtitle:
    "Entrez votre adresse ou partagez votre position : nous affichons les pharmacies autour de vous, avec la distance et leurs horaires.",
  placeholder: "Rechercher une adresse",
  hint: "Exemple : rue Joss, Akwa",
  nearMe: "Use my location",
  find: "Trouver",
  locating: "Localisation en cours…",
  geoError:
    "Position indisponible. Autorisez la localisation ou saisissez une adresse.",
  card: {
    name: "Pharmacie de Bonanjo",
    meta: "350 m · à 4 min à pied",
    open: "Ouverte",
  },
};

/* ---------- Map illustration (inline SVG, no external image) ---------- */
type PinProps = { x: number; y: number; delay: number; big?: boolean };

function Pin({ x, y, delay, big }: PinProps) {
  const reduce = useReducedMotion();
  const s = big ? 1.25 : 0.9;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <motion.g
        initial={reduce ? false : { opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
      >
        <ellipse cx="0" cy="2" rx="9" ry="3" fill="#0C2A1D" opacity="0.18" />
        <path
          d="M0 0C-10-14-16-22-16-30a16 16 0 1 1 32 0c0 8-6 16-16 30z"
          fill={big ? "#0F6B3F" : "#2F8F5F"}
        />
        <rect x="-2.5" y="-37" width="5" height="14" rx="1" fill="#fff" />
        <rect x="-7" y="-32.5" width="14" height="5" rx="1" fill="#fff" />
      </motion.g>
    </g>
  );
}

function DoualaMap() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 600 640"
      role="img"
      aria-label="Carte illustrée de Douala montrant des pharmacies autour de votre position"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* land */}
      <rect width="600" height="640" fill="#EAF1EB" />

      {/* parks */}
      <rect x="380" y="380" width="90" height="60" rx="14" fill="#D3E6D6" />
      <rect x="40" y="110" width="80" height="90" rx="16" fill="#D3E6D6" />

      {/* river Wouri */}
      <path
        d="M250 -20C310 150 190 300 265 440S340 600 300 680"
        fill="none"
        stroke="#C4DDE6"
        strokeWidth="96"
        strokeLinecap="round"
      />
      <path
        d="M250 -20C310 150 190 300 265 440S340 600 300 680"
        fill="none"
        stroke="#D7E9EF"
        strokeWidth="60"
        strokeLinecap="round"
      />

      {/* minor streets */}
      <g stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M330 60L600 110" />
        <path d="M340 170L600 220" />
        <path d="M330 330L600 360" />
        <path d="M320 470L600 520" />
        <path d="M0 250L180 230" />
        <path d="M0 410L190 440" />
        <path d="M0 540L220 560" />
        <path d="M400 0L430 640" />
        <path d="M520 0L560 640" />
        <path d="M70 0L60 640" />
      </g>

      {/* main avenues */}
      <g stroke="#fff" strokeWidth="11" strokeLinecap="round" fill="none">
        <path d="M335 270L600 300" />
        <path d="M470 0L500 640" />
        <path d="M0 330L190 345" />
        <path d="M130 0L150 640" />
      </g>

      {/* bridge over the Wouri */}
      <path
        d="M170 322L350 306"
        stroke="#9DB8C2"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path
        d="M170 322L350 306"
        stroke="#fff"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* labels */}
      <g
        fill="#5E8070"
        fontSize="13"
        fontWeight="600"
        style={{ fontFamily: "inherit" }}
      >
        <text x="62" y="300">
          Bonabéri
        </text>
        <text x="420" y="196">
          Akwa
        </text>
        <text x="338" y="500">
          Bonanjo
        </text>
        <text x="500" y="590">
          Bonapriso
        </text>
      </g>
      <text
        x="198"
        y="150"
        fill="#6F97A6"
        fontSize="12"
        fontStyle="italic"
        transform="rotate(74 198 150)"
      >
        Wouri
      </text>

      {/* search radius */}
      <circle
        cx="430"
        cy="330"
        r="125"
        fill="#0F6B3F"
        fillOpacity="0.07"
        stroke="#0F6B3F"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />

      {/* pins */}
      <Pin x={96} y={392} delay={0.5} />
      <Pin x={500} y={175} delay={0.65} />
      <Pin x={528} y={470} delay={0.8} />
      <Pin x={388} y={262} delay={0.95} big />

      {/* user location */}
      <g>
        {!reduce && (
          <motion.circle
            cx="430"
            cy="330"
            r="10"
            fill="#2563EB"
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{ opacity: 0, scale: 3.2 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: "430px 330px" }}
          />
        )}
        <circle cx="430" cy="330" r="10" fill="#fff" />
        <circle cx="430" cy="330" r="6.5" fill="#2563EB" />
      </g>
    </svg>
  );
}

/* ---------- Hero ---------- */
export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFind(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/pharmacies?q=${encodeURIComponent(q)}`);
  }

  function handleNearMe() {
    setError(null);
    if (!("geolocation" in navigator)) {
      setError(COPY.geoError);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        router.push(
          `/pharmacies?lat=${coords.latitude}&lng=${coords.longitude}`,
        );
      },
      () => {
        setLocating(false);
        setError(COPY.geoError);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <HeroSection>
      <section className="mx-auto grid min-h-[100svh] max-w-7xl 2xl:items-center  gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:py-16">
        {/* Left: message + search */}
        <div className="max-w-xl mt-12 2xl:mt-0">
          <h1
            className={`font-display text-[2.4rem] text-center lg:text-left font-semibold leading-[1.05] tracking-tight lg:text-[3rem] 2xl:text-[4rem]`}
          >
            {COPY.title}
          </h1>
          <p className="mt-5 max-w- subtitle text-center lg:text-left  leading-relaxed text-muted-foreground">
            {COPY.subtitle}
          </p>

          {/* FORM====================================================================== */}
          <form
            onSubmit={handleFind}
            className="mt-8 rounded-2xl border border-primary/20 bg-card p-4 "
          >
            <label htmlFor="address" className="sr-only">
              {COPY.placeholder}
            </label>
            <div className="relative">
              <MapPin
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0F6B3F]"
              />
              <Input
                id="address"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={COPY.placeholder}
                autoComplete="street-address"
                className=" pl-12 "
              />
            </div>

            <div className="mt-3 flex flex-col gap-3 lg:flex-row ">
              <Button
                type="button"
                variant="outline"

                onClick={handleNearMe}
                disabled={locating}
                className=" lg:flex-1 "
              >
                <LocateFixed />
                {locating ? COPY.locating : COPY.nearMe}
              </Button>
              <Button size="lg" type="submit" className=" lg:flex-1 ">
                <Search />
                Find Pharmacy
              </Button>
            </div>
          </form>
        </div>

        {/* Right: map illustration */}
        <div className="relative mx-auto aspect-[15/16] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-[#D5E3D9] bg-[#EAF1EB] shadow-[0_30px_60px_-30px_rgba(12,42,29,0.35)] lg:max-w-none">
          <DoualaMap />

          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0F6B3F] text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{COPY.card.name}</p>
              <p className="truncate text-sm text-[#5E8070]">
                {COPY.card.meta}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#E3F3E8] px-3 py-1 text-sm font-medium text-[#0F6B3F]">
              <Clock className="h-3.5 w-3.5" />
              {COPY.card.open}
            </span>
          </div>
        </div>
      </section>
    </HeroSection>
  );
}
