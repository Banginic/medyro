import { serverPost } from "@/components/index";
import { AddressTypes, } from "../types";
import { AddressSchemaType } from "../schemas/addressSchema";

export async function updateAddressInfo(body: AddressSchemaType) {
  return serverPost<AddressTypes>({
    endpoint: `/settings/address/${body.projectId}`,
    method: "PATCH",
    title: "address info",
    body: body,
  });
}
