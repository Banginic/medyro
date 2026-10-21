import { getServerPharmacy } from "@/features/pharmacy/actions/getServerPharmay";
import PharmacyDetailsPage from "@/features/pharmacy/components/PharmacyDetailsPage";
import { PharmacyGeneratedMetadata } from "@/features/pharmacy/metadata/pharmacyGeneratedMetadata";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsId = await params;
  const data = await getServerPharmacy(paramsId.slug);

  if (!data || !data.data) {
    return {
      title: "No Pharmacy Found - Medyro",
      description: "This pharmacy data could not be found.",
    };
  }

  return PharmacyGeneratedMetadata(data?.data[0]);
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const paramsId = await params;

  const data = await getServerPharmacy(paramsId.slug);
  if (!data || !data.data || data.data.length === 0) {
    notFound();
  }
  return (
    <div className="">
      <h1 className="sr-only">{data?.data[0].name}</h1>

      <PharmacyDetailsPage pharmacyData={data} />
    </div>
  );
}

export default page;
