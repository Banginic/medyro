import { serverPost } from "@/components/index";
import { ProfileSchemaType } from "../schemas/profileSchema";
import { ProfileInfoTypes } from "../types";

export async function updateProfileInfo(body: ProfileSchemaType) {
  return serverPost<ProfileInfoTypes>({
    endpoint: `/settings/project-informations/${body.projectId}`,
    method: "PATCH",
    title: "project info",
    body: body,
  });
}
