"use client";
import { Clock3, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/share/shared";
import Image from "next/image";
import Link from "next/link";
import ContactCard from "./ContactCard";

const contactItems = [
  { icon: MapPin, label: "Location", value: "Douala, Cameroon" },
  { icon: Phone, label: "Phone", value: "[Phone number]" },
  { icon: Mail, label: "Email", value: "[Email address]" },
  { icon: Clock3, label: "Opening Hours", value: "[Opening hours]" },
];

export default function LocationSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1.15fr] lg:gap-16 lg:px-8">
        <Reveal>
          <div className="aspect-video overflow-hidden rounded-3xl outline-5  bg-muted shadow-soft">
            <video
              src="https://res.cloudinary.com/tn0cvsmr/video/upload/q_auto,f_auto/WhatsApp_Video_2026-10-01_at_16.52.58.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="aspect- overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
            <Image
              src={"/images/map.png"}
              alt="Directional map to St. Sylvester Medical Foundation showing SNEC, Santé Lucia, Dallas, NABICO Collège, Moote Paragon, Ancienne route, and the route from château d'eau"
              loading="lazy"
              width={1408}
              height={1056}
              className="size-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
