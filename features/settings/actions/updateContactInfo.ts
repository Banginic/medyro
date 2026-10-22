import { serverPost } from "@/components/index";
import { ContactTypes,  } from "../types";
import { ContactSchemaType } from "../schemas/contactSchema";

export async function updateContactInfo(body: ContactSchemaType) {
  return serverPost<ContactTypes>({
    endpoint: `/settings/contacts/${body.projectId}`,
    method: "PATCH",
    title: "contact info",
    body: body,
  });
}
