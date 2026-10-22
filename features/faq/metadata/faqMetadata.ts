import { createPageMetadata } from "@/metadata/createMetadata";

const metadataDetails = {
  title: "FAQs - Medyro Pharmacy Finder",

  description:
    "Find answers to frequently asked questions about Medyro Pharmacy Finder, locating nearby pharmacies, finding medications, and managing your pharmacy listing.",

  path: "/faq",

  ogDescription:
    "Have questions about Medyro? Learn how to find pharmacies, search for medications, and manage your pharmacy listing with our frequently asked questions.",

  twitterDescription:
    "Get answers to common questions about finding pharmacies, searching for medications, and using Medyro Pharmacy Finder.",
};

export const FaqMetadata = createPageMetadata(metadataDetails);
