import FindPharmacyPage from '@/features/pharmacy/components/FindPharmacyPage'
import { PharmacyMetadata } from '@/features/pharmacy/metadata/pharmacyMetadata';

export const metadata = PharmacyMetadata

function page() {
  return (
    <div>
      <FindPharmacyPage />
    </div>
  )
}

export default page