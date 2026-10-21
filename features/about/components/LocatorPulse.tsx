"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";

// Pharmacy markers dropped around the user's position
const markers = [
  { top: "16%", left: "58%", delay: 1.0 },
  { top: "36%", left: "14%", delay: 1.2 },
  { top: "66%", left: "78%", delay: 1.4 },
  { top: "78%", left: "28%", delay: 1.6 },
];

export default function LocatorPulse() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-sm">
      {/* Static search radius rings */}
      {[100, 70, 40].map((size) => (
        <div
          key={size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
          style={{ width: `${size}%`, height: `${size}%` }}
        />
      ))}

      {/* Two pulses, then the scene rests */}
      {!reduceMotion &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-[30%] rounded-full border-2 border-primary/50"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{
              duration: 1.8,
              delay: i * 0.7,
              ease: "easeOut",
            }}
          />
        ))}

      {/* User position */}
      <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <MapPin className="size-7" />
      </div>

      {/* Pharmacy markers */}
      {markers.map((marker) => (
        <div
          key={marker.top + marker.left}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: marker.top, left: marker.left }}
        >
          <motion.div
            className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow"
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 16,
              delay: marker.delay,
            }}
          >
            <Plus className="size-6" strokeWidth={3.5} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}