import { serverPost } from "@/components/index";
import { UserTypes } from "../types";
import { SignUpSchemaType } from "../schemas/signUpSchema";

export async function createUser(body: SignUpSchemaType) {
  return serverPost<UserTypes>({
    endpoint: "/admins",
    method: "POST",
    body,
    title: "Users",
  });
}
