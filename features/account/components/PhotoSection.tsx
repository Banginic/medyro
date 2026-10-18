"use client";
import { placeholdeImage } from "@/assets/photos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Image as Image3, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CoverImageForm from "../forms/CoverImageForm";
import LogoForm from "../forms/LogoForm";
import { PharmacyType } from "@/features/pharmacy/types";

function PhotoSection({ pharmacy }: { pharmacy: PharmacyType }) {
  const [openImageForm, setImageForm] = useState(false);
  const [openLogoForm, setLogoForm] = useState(false);
  return (
    <>
      <Card className="p-4 max-w-lg mx-auto relative ">
        <div className="relative h-42 lg:h-52 w-full border overflow-hidden">
          <Image
            src={pharmacy.coverImage ?? placeholdeImage}
            fill
            className="w-full h-full object-cover rounded-lg"
            alt="Pharmacy front image"
          />
          <Button
            title="Change photo"
            className="absolute bottom-0 right-0 rounded-full bg-muted hover:bg-primary  px-1 h-6 hover:text-primary-foreground"
            size={"sm"}
            variant={"ghost"}
            onClick={() => setImageForm(true)}
          >
            <PlusCircle />
          </Button>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
          <div className="relative size-10 lg:size-12 rounded-full border-2 ">
            <Image
              src={pharmacy.logo ?? placeholdeImage}
              fill
              className="w-full h-full object-cover rounded-full"
              alt="Pharmacy logo"
            />
            <Button
              title="Change logo"
              className="absolute bottom-0 -right-2 rounded-full bg-muted hover:bg-primary h px-0.5 h-5.5 hover:text-primary-foreground"
              size={"sm"}
              variant={"secondary"}
              onClick={() => setLogoForm(true)}
            >
              <PlusCircle />
            </Button>
          </div>
          <div className="flex flex-col flex-1">
            <div className=" flex items-center gap-4 justify-between ">
              <h1 className="text-base font-semibold">{pharmacy.name}</h1>
              {pharmacy.verificationStatus === "verified" ? (
                <div className="flex gap-2.5 items-center text-emerald-600">
                  <CheckCircle strokeWidth={2.5} className="size-4 " />
                  <span className="text-[12px]">Verified</span>
                </div>
              ) : (
                <div className="flex gap-2.5 items-center text-yellow-600">
                  <span className="text-[12px]">Not Verified</span>
                  <Button size={'sm'} variant={'link'} className="h-1">Verify now</Button>
                </div>
              )}
            </div>
            <p className="text-[11px] ">PHM-34/2021-Dec</p>
          </div>
        </div>
      </Card>

      <>
        {openImageForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 grid place-items-center py-8">
            <CoverImageForm
              closeForm={setImageForm}
              photoUrl={pharmacy.coverImage}
            />
          </div>
        )}
      </>
      <>
        {openLogoForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 grid place-items-center py-8">
            <LogoForm closeForm={setLogoForm} photoUrl={pharmacy.logo} />
          </div>
        )}
      </>
    </>
  );
}

export default PhotoSection;
