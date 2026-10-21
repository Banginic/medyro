import { Button } from '@/components/ui/button';
import { PharmacyType } from '../types';
import PharmacyCard from './admin/PharmacyCard';
import { Search,  } from 'lucide-react';

function FindPharmacyGrid({pharmacies, onReset }: {pharmacies: PharmacyType[], onReset: () => void}) {
  return (
    <div className=" grid gap-2 relative ">
      <Button onClick={onReset} size={'sm'} className='absolute -top-14'>
        <Search />
        Find again
      </Button>
      {
        pharmacies.map((pharmacy) => (
          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} href={`/pharmacies/${pharmacy.slug}`} />
        ))
      }
    </div>
  )
}

export default FindPharmacyGrid