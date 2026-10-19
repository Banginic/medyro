"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectDetails } from "@/constants/project-details";
import { getProfile } from "@/features/profiles/actions/getProfile";
import { ProfileType } from "@/features/profiles/types";
import { useQuery } from "@tanstack/react-query";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

function ContactCard() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["Contact"],
    queryFn: getProfile,
  });

  let details: ProfileType = projectDetails;

  if (!isFetching && !isError && data?.data?.length) {
    details = data.data[0];
  }

  return (
    <Card className="p-2 ">
      <CardHeader className="p-2 lg:px-6 lg:pt-4 not-italic">
        <CardTitle>Contact Info</CardTitle>
        <CardDescription className="text-muted-foreground">
          Contact us using any of the options{" "}
        </CardDescription>
      </CardHeader>
      <div className="lg:px-2 space-y-2 mb-4">
        <a
          href={`tel:${details?.phone}`}
          target="blanc"
          className=" bg-secondary hover:bg-secondary/70 flex px-4 py-2 justify-between items-center rounded-2xl"
        >
          <div className="flex gap-4 items-center">
            <Phone className="size-5" />
            <span className="hover:underline">{details?.phone}</span>
          </div>

          <button
            className="cursor-pointer hover:border-ring/40 border p-1 rounded-md bg-muted shadow"
            aria-label={`Call ${projectDetails.projectName}`}
            title="Call Us Now!"
          >
            <img
              src={"/icons/phone.png"}
              height={20}
              width={20}
              alt={`Call ${projectDetails.projectName}`}
              loading="lazy"
            />
          </button>
        </a>
        <a
          href={`tel:+237 693675946`}
          target="blanc"
          className=" bg-secondary hover:bg-secondary/70 flex px-4 py-2 justify-between items-center rounded-2xl"
        >
          <div className="flex gap-4 items-center">
            <Phone className="size-5" />
            <span className="hover:underline">+237 693675946</span>
          </div>

          <button
            className="cursor-pointer hover:border-ring/40 border p-1 rounded-md bg-muted shadow"
            aria-label={`Call ${projectDetails.projectName}`}
            title="Call Us Now!"
          >
            <img
              src={"/icons/phone.png"}
              height={20}
              width={20}
              alt={`Call ${projectDetails.projectName}`}
              loading="lazy"
            />
          </button>
        </a>

        <a
          href={`mailto:${details.email}`}
          target="blanc"
          className=" bg-secondary hover:bg-secondary/70 flex px-4 py-2 justify-between items-center rounded-2xl"
        >
          <div className="flex gap-4 items-center">
            <Mail className="size-5" />
            <span className="hover:underline">{details.email}</span>
          </div>

          <button
            className="cursor-pointer border  hover:border-ring/40 p-1 rounded-md bg-muted shadow"
            aria-label="Email SSMF"
            title="Send Email Now!"
          >
            <img
              src={"/icons/gmail.png"}
              height={18}
              width={18}
              alt="whatsApp SSMF"
              loading="lazy"
            />
          </button>
        </a>

        <a
          href={`https://wa.me/${details.whatsApp}`}
          target="_blank"
          rel="noopener noreferrer"
          className=" bg-secondary hover:bg-secondary/70  flex px-3 py-2 justify-between items-center rounded-2xl"
        >
          <div className="flex gap-2 items-center">
            <img
              src={"/icons/whatsApp.png"}
              height={30}
              width={30}
              alt="whatsApp SSMF"
              loading="lazy"
              className="grayscale"
            />
            <span className="hover:underline">{details.whatsApp}</span>
          </div>{" "}
          <button
            className="cursor-pointer border  hover:border-ring/40 p-0.5 rounded-md bg-muted shadow"
            aria-label="WhatsApp SSMF"
            title="Send message now!"
          >
            <img
              src={"/icons/whatsApp.png"}
              height={26}
              width={26}
              alt="whatsApp SSMF"
              loading="lazy"
            />
          </button>
        </a>

        <div className=" bg-secondary hover:bg-secondary/70 flex px-4 py-2 justify-between items-center rounded-2xl">
          <p className="flex gap-4 ">
            <MapPin className="size-5" />
            <span className="space-x-4">
              {details.address} - {details.city}
            </span>
          </p>
        </div>
        <div className=" bg-secondary hover:bg-secondary/70 flex px-4 py-2 justify-between items-center rounded-2xl">
          <p className="flex gap-4 ">
            <Globe className="size-5" />
            <span className="space-x-4">{details.country}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ContactCard;
