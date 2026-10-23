"use client";
import { useQuery } from "@tanstack/react-query";
import {

  Loading,

  Title,
} from "@/components/index";
import Image from "next/image";
import VerificationForm from "../forms/VerificationForm";
import { getVerification } from "../actions/getVerification";
import VerificationCard from "./VerificationCard";

function VerificatonPage({ pharmacyId }: { pharmacyId: string }) {


  const { isError, isFetching, data } = useQuery({
    queryKey: ["Verification"],
    queryFn: () => getVerification(pharmacyId),
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="w-full min-w-0  rounded-2xl border bg-secondary/20 p-4 lg:w-1/2">
          <Title message="Verification" />

          <section>
            {isFetching ? (
              <Loading />
            ) : isError || !data || !data?.data || data.data.length === 0 ? (
              <VerificationForm pharmacyId={pharmacyId} />
            ) : (
              <VerificationCard verifications={data?.data} />
            )}
          </section>
        </div>

        {/* Image (bottom on mobile, right on desktop) */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-auto lg:min-h-120 lg:w-2/5">
          <Image
            src="/images/pharmacy-image.avif"
            alt="Find a pharmacy near you"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default VerificatonPage;
