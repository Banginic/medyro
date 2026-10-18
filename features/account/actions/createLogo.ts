import { serverPost } from "@/components/index";
import { PharmacyTypes } from "@/features/pharmacy/types";

export async function createLogo(body: FormData) {
  return serverPost<PharmacyTypes>({
    endpoint: `/pharmacies/logo`,
    method: "PATCH",
    title: "cover image",
    body,
  });
}
