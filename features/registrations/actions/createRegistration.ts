import { serverPost } from "@/components/index";
import { RegistrationSchemaType } from "../schemas/registrationSchema";
import { PharmacyTypes } from "@/features/pharmacy/types";

export async function createRegistration(body: RegistrationSchemaType) {
  return serverPost<PharmacyTypes>({
    method: "POST",
    body,
    title: "registration",
    endpoint: "/pharmacies/register-pharmacy",
  });
}
