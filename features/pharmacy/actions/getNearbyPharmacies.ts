import { clientFetch } from "@/components/index";
import { NearbyPharmacySearchParams, PharmacyTypes } from "../types";

export async function getNearbyPharmacies(
  searchParams: NearbyPharmacySearchParams,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return clientFetch<PharmacyTypes>({
    endpoint: "/pharmacies/nearby-pharmacies",
    params: `&${params.toString()}`,
    method: "GET",
    title: "nearby pharmacies",
  });
}
