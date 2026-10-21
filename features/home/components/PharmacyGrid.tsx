import PharmacyCard from "@/features/pharmacy/components/admin/PharmacyCard";
import { PharmacyType } from "@/features/pharmacy/types";

function PharmacyGrid({
  pharmacies,
  onReset,
}: {
  pharmacies: PharmacyType[];
  onReset: () => void;
}) {
  return (
    <div className=" grid gap-2 relative ">
      {pharmacies.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy.id}
          pharmacy={pharmacy}
          href={`/pharmacies/${pharmacy.slug}`}
        />
      ))}
    </div>
  );
}

export default PharmacyGrid;
