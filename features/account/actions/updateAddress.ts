import { serverPost } from "@/components/index";
import { PharmacyTypes } from "@/features/pharmacy/types";
import { AddressSchemaType } from "../schemas/addressSchema";

export async function updateAddress(body: AddressSchemaType) {
  return serverPost<PharmacyTypes>({
    endpoint: `/pharmacies/update-address`,
    method: "PATCH",
    title: "address",
    body,
  });
}
