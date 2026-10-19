import { clientFetch } from "@/components/index";
import { OpeningHourTypes } from "../types";

export async function getOpeningHours(){
    return clientFetch<OpeningHourTypes>({
        endpoint: '/opening-hours',
        title: 'opening hours',
        method: 'GET'
    })
}