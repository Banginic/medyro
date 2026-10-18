import { PharmacyType } from "@/features/pharmacy/types";
import PhotoSection from "./PhotoSection";

function AccountDetails({ pharmacies }: { pharmacies: PharmacyType[] }) {
  const pharmacy = pharmacies[0];

  return (
    <div>
      <PhotoSection pharmacy={pharmacy} />
    </div>
  );
}

export default AccountDetails;
