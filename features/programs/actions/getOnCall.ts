import { clientFetch } from "@/components/index";
import { OnCallSearchParamsType, OnCallTypes } from "../types";

export async function getOnCall(
  searchParams: OnCallSearchParamsType,
  id: string,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return clientFetch<OnCallTypes>({
    endpoint: `/on-calls/${id}`,
    params: `&${params.toString()}`,
    method: "GET",
    title: "schedule",
  });
}
