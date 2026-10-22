import { serverPost } from "@/components/index";
import { UserTypes } from "../types";
import { SignUpSchemaType } from "../schemas/signUpSchema";

export async function createAdmin(body: SignUpSchemaType) {
  return serverPost<UserTypes>({
    endpoint: "/admins/users",
    method: "POST",
    body,
    title: "Users",
  });
}
