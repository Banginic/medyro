import { serverPost } from "@/components/index";
import { ContactTypes } from "../types";
import { ContactSchemaType } from "../schemas/contactSchema";

export async function createContactInfo(body: ContactSchemaType) {
  return serverPost<ContactTypes>({
    endpoint: "/settings/contacts",
    method: "POST",
    title: "contact info",
    body: body,
  });
}
