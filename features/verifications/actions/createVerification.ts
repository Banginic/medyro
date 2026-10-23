import { serverPost } from "@/components/index";
import { VerificationTypes } from "../types";

export async function createVerification(body: FormData) {
  return serverPost<VerificationTypes>({
    endpoint: "/verifications",
    method: "POST",
    title: "verification",
    body,
  });
}
