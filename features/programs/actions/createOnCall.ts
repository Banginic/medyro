import { serverPost } from "@/components/index";
import { OnCallTypes } from "../types";
import {OnCallSchemaType} from '../schemas/onCallSchema'

export async function createOnCall(body: OnCallSchemaType) {
  return serverPost<OnCallTypes>({
    endpoint: "/on-calls",
    method: "POST",
    body,
    title: "schedule",
  });
}
