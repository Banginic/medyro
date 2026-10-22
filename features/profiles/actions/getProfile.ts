import { clientFetch } from "@/components/index";
import { ProfileTypes } from "../types";

export async function getProfile() {
  return clientFetch<ProfileTypes>({
    endpoint: "/profiles",
    method: "GET",
    title: "Profile",
  });
}
