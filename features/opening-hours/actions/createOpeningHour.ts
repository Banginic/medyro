import { serverPost } from "@/components/index";
import { OpeningHourTypes } from "../types";

export async function createOpeningHour(body: FormData) {
  return await serverPost<OpeningHourTypes>({
    endpoint: "/opening-hours",
    method: "POST",
    body,
    title: "Opening hours",
  });
}
