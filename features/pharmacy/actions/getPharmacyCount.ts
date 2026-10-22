import { clientFetch } from "@/components/index";
import { CountTypes } from "@/models/types";

export async function getPharmacyCount() {
  return clientFetch<CountTypes>({
    endpoint: `/pharmacies/count`,
    method: "GET",
    title: "pharmacies count",
  });
}
