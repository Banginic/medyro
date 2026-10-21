import { clientFetch } from "@/components/index";
import { PharmacyTypes } from "../types";

export async function getPharmacyProfile(){
    return clientFetch <PharmacyTypes>({
        endpoint: `/pharmacies/profiles`,
        method: 'GET',
        title: 'pharmacy'
    })
}