'use client'

import { PharmacyType } from "@/features/pharmacy/types";
import PhotoSection from "./PhotoSection";
import ProfileForm from "../forms/ProfileForm";
import AddressForm from "../forms/AddressForm";
import MapSection from "@/features/map/components/MapSection";
import DeleteAccount from "./DeleteAccount";

function AccountDetails({ pharmacies }: { pharmacies: PharmacyType[] }) {
  const pharmacy = pharmacies[0];

  return (
    <div className="border py-16 rounded-md lg:px-8">
      <PhotoSection pharmacy={pharmacy} />
      <div className="mt-12 space-y-4">
        <ProfileForm pharmacy={pharmacy} />
        <AddressForm pharmacy={pharmacy} />
        <MapSection pharmacy={pharmacy} />
        <DeleteAccount />
      </div>
    </div>
  );
}

export default AccountDetails;
