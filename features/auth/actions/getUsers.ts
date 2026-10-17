import { clientFetch } from "@/components/index";
import { AdminSearchParamsType, UserTypes } from "../types";

export async function getUsers(searchParams: AdminSearchParamsType) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return clientFetch<UserTypes>({
    endpoint: "/admins",
    params: `&${params.toString()}`,
    method: "GET",
    title: "Users",
  });
}
