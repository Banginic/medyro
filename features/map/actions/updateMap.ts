import { serverPost } from "@/components/index";
import { PharmacyTypes } from "@/features/pharmacy/types";
import { MapSchemaType } from "../schemas/mapSchema";

export async function updateMap(body: MapSchemaType) {
  return serverPost<PharmacyTypes>({
    endpoint: `/pharmacies/update-map`,
    method: "PATCH",
    title: "map",
    body,
  });
}
