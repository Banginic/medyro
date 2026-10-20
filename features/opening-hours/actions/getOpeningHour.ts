import { clientFetch } from "@/components/index";
import { OpeningHourTypes } from "../types";

export async function getOpeningHour(id: string) {
  return clientFetch<OpeningHourTypes>({
    endpoint: `/opening-hours/${id}`,
    title: "opening hour",
    method: "GET",
  });
}
