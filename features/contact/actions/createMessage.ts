import { serverPost } from "@/components/index";
import { MessageTypes } from "../types";
import { ContactSchemaType } from "../schemas/contactSchema";

export async function createMessage(body: ContactSchemaType) {
  return serverPost<MessageTypes>({
    endpoint: "/messages",
    method: "POST",
    body,
    title: "Messages",
  });
}
