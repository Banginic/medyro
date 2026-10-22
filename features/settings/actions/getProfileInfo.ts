import { clientFetch } from "@/components/index";
import { ProfileInfoTypes } from "../types";

export async function getProfileInfo() {
  return clientFetch<ProfileInfoTypes>({
    endpoint: "/settings/project-informations",
    method: "GET",
    title: "project info",
  });
}
