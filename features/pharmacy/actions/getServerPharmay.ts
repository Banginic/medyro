import { serverFetch } from "@/components/index";
import { PharmacyTypes } from "../types";

export async function getServerPharmacy(slug: string) {
  return serverFetch<PharmacyTypes>({
    endpoint: `/pharmacies/${slug}`,
    method: "GET",
    title: "pharmacies",
  });
}
