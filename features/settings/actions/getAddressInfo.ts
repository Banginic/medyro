import { clientFetch } from "@/components/index";
import { AddressTypes, } from "../types";

export async function getAddressInfo() {
  return clientFetch<AddressTypes>({
    endpoint: "/settings/address",
    method: "GET",
    title: "address info",
  });
}
