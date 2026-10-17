import { clientFetch } from "@/components/index";
import {  UserTypes } from "../types";

export async function getUser(id: string) {
  return await clientFetch<UserTypes>({
    endpoint: `/admins/${id}`,
    method: "GET",
    title: "Admin users",
  });
}
