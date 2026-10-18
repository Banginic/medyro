import { clientFetch } from "@/components/index";
import { PharmacyTypes } from "../types";

export async function getPharmacyProfile(){
    return clientFetch <PharmacyTypes>({
        endpoint: `/pharmacies/get-profile`,
        method: 'GET',
        title: 'pharmacy'
    })
}