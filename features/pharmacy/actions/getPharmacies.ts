import { clientFetch } from "@/components/index";
import { AdminPharmacySearchParams, PharmacyTypes } from "../types";

export async function getPharmacies(
  searchParams: AdminPharmacySearchParams,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return clientFetch<PharmacyTypes>({
    endpoint: "/pharmacies",
    params: `&${params.toString()}`,
    method: "GET",
    title: "active pharmacies",
  });
}
