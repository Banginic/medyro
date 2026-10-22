import { serverPost } from "@/components/index";
import { AddressTypes } from "../types";
import { AddressSchemaType } from "../schemas/addressSchema";

export async function createAddressInfo(body: AddressSchemaType) {
  return serverPost<AddressTypes>({
    endpoint: "/settings/address",
    method: "POST",
    title: "address info",
    body: body,
  });
}
