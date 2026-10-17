"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, MapPin, Bell, Youtube } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Gold Glow */}
      <div className="absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[120px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl px-6"
      >
        <Card className="border-yellow-500/20 bg-white/5 p-10 text-center backdrop-blur-xl">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full border border-yellow-500/30 bg-yellow-500/10 p-5">
              <Flame className="h-10 w-10 text-yellow-400" />
            </div>
          </div>

          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-400">
            COMING SOON
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Throne Of Fire
            <span className="block text-yellow-400">Ministry</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our brand-new website is almost here. Soon you'll be able to  listen to sermons, submit prayer requests, discover
            upcoming events, and stay connected with everything God is doing
            through our ministry.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-gray-300">
            <MapPin className="h-5 w-5 text-yellow-400" />
            <span>Mile III, Bamenda, Cameroon</span>
          </div>

          {/* Countdown */}
          <div className="mt-10 grid grid-cols-4 gap-4">
            {[
              { value: "09", label: "Days" },
              { value: "18", label: "Hours" },
              { value: "42", label: "Minutes" },
              { value: "09", label: "Seconds" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-3xl font-bold text-yellow-400">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notify Me
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
            >
              <Link href="#">
                <Youtube className="mr-2 h-4 w-4" />
                Watch Live
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Throne Of Fire Ministry. All Rights
            Reserved.
          </div>
        </Card>
      </motion.div>
    </main>
  );
}