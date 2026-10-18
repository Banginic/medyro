import { serverPost } from "@/components/index";
import { PharmacyTypes } from "@/features/pharmacy/types";
import { ProfileSchemaType } from "../schemas/profileSchema";

export async function updateProfile(body: ProfileSchemaType) {
  return serverPost<PharmacyTypes>({
    endpoint: `/pharmacies/update-pharmacy`,
    method: "PATCH",
    title: "profile",
    body,
  });
}
