import { clientFetch } from "@/components/index";
import { OnCallSearchParamsType, OnCallTypes } from "../types";

export async function getOnCalls(searchParams: OnCallSearchParamsType) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return clientFetch<OnCallTypes>({
    endpoint: "/on-calls",
    params: `&${params.toString()}`,
    method: "GET",
    title: "schedule",
  });
}
