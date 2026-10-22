import { serverPost } from "@/components/index";
import { ProfileSchemaType } from "../schemas/profileSchema";
import { ProfileInfoTypes } from "../types";

export async function createProfileInfo(body: ProfileSchemaType) {
  return serverPost<ProfileInfoTypes>({
    endpoint: "/settings/project-informations",
    method: "POST",
    title: "project info",
    body: body,
  });
}
