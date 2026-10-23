import { clientFetch } from "@/components/index";
import { VerificationTypes } from "../types";

export async function getVerification(id: string){
    return clientFetch<VerificationTypes>({
        endpoint: `/verifications/${id}`,
        method: "GET",
        title: 'verification Status'
    })
}