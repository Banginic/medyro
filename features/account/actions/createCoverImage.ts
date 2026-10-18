import { serverPost } from "@/components/index";
import { PharmacyTypes } from "@/features/pharmacy/types";

export async function createCoverImage(body: FormData) {
  return serverPost<PharmacyTypes>({
    endpoint: `/pharmacies/cover-image`,
    method: "PATCH",
    title: "cover image",
    body,
  });
}
