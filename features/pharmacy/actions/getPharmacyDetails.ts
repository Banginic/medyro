import { clientFetch } from "@/components/index";
import { PharmacyTypes } from "../types";

export async function getPharmacyDetails(slug: string) {
  return clientFetch<PharmacyTypes>({
    endpoint: `/pharmacies/${slug}`,
    method: "GET",
    title: "Pharmacy details",
  });
}
