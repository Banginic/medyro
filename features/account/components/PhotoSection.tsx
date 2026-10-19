"use client";
import { placeholdeImage } from "@/assets/photos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PharmacyType } from "@/features/pharmacy/types";
import { BadgeCheck, Camera, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CoverImageForm from "../forms/CoverImageForm";
import LogoForm from "../forms/LogoForm";

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-background/20 py-8 backdrop-blur-2xl"
    >
      {children}
    </div>
  );
}

function PhotoSection({ pharmacy }: { pharmacy: PharmacyType }) {
  const [openImageForm, setImageForm] = useState(false);
  const [openLogoForm, setLogoForm] = useState(false);
  const isVerified = pharmacy.verificationStatus === "verified";

  return (
    <header>
      <Card className="mx-auto max-w-2xl gap-0 overflow-hidden p-0">
        {/* Cover */}
        <div className="relative h-36 w-full bg-muted sm:h-44 lg:h-52">
          <Image
            src={pharmacy.coverImage ?? placeholdeImage}
            alt="Pharmacy cover"
            fill
            priority
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => setImageForm(true)}
            className="absolute right-3 top-3 gap-1.5 bg-background/80 backdrop-blur hover:bg-background"
          >
            <Camera className="size-4" />
            <span className="hidden sm:inline">Edit cover</span>
          </Button>
        </div>

        {/* Body */}
        <div className="px-4 pb-5 sm:px-6">
          {/* Logo overlapping the cover */}
          <div className="relative -mt-10 size-20 sm:-mt-12 sm:size-24">
            <div className="relative size-full overflow-hidden rounded-2xl bg-muted ring-4 ring-card">
              <Image
                src={pharmacy.logo ?? placeholdeImage}
                alt="Pharmacy logo"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              title="Change logo"
              onClick={() => setLogoForm(true)}
              className="absolute -bottom-1 -right-1 size-7 rounded-full border bg-background shadow-sm hover:bg-primary hover:text-primary-foreground"
            >
              <Camera className="size-3.5" />
            </Button>
          </div>

          {/* Identity + status */}
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight">
                {pharmacy.name}
              </h1>
              {/* TODO: replace with the real license field */}
              <p className="text-xs text-muted-foreground">
                License · PHM-34/2021-Dec
              </p>
            </div>

            {isVerified ? (
              <Badge
                variant="outline"
                className="w-fit gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-600"
              >
                <BadgeCheck className="size-3.5" />
                Verified
              </Badge>
            ) : (
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="gap-1.5 border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-amber-600"
                >
                  <ShieldAlert className="size-3.5" />
                  Not verified
                </Badge>
                <Button size="sm" className="h-7 px-3 text-xs">
                  Verify now
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {openImageForm && (
        <Overlay>
          <CoverImageForm
            closeForm={setImageForm}
            photoUrl={pharmacy.coverImage}
          />
        </Overlay>
      )}
      {openLogoForm && (
        <Overlay>
          <LogoForm closeForm={setLogoForm} photoUrl={pharmacy.logo} />
        </Overlay>
      )}
    </header>
  );
}

export default PhotoSection;