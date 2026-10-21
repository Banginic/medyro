import SupportPage from '@/features/support/components/ClientSupportPage';
import { SupportMetadata } from '@/features/support/metadata/supportMetadata';

export const metadata = SupportMetadata

function page() {
  return (
    <div>
        <SupportPage />
    </div>
  )
}

export default page