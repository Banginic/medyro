import { clientFetch } from "@/components/index";
import { ContactTypes, } from "../types";

export async function getContactInfo() {
  return clientFetch<ContactTypes>({
    endpoint: "/settings/contacts",
    method: "GET",
    title: "contact info",
  });
}
