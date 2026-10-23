import VerificationPage from "@/features/verifications/components/VerificationPage";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ pharmacyId: string }>;
}) {
  const paramsId = await searchParams;

  return (
    <div>
      <VerificationPage pharmacyId={paramsId.pharmacyId} />
    </div>
  );
}

export default page;
