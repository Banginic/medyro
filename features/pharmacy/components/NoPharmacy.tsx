import { NoData } from "@/components/index";
import { Button } from "@/components/ui/button";

function NoPharmacy({ onReset }: { onReset: () => void }) {
  function CTA({ reset }: { reset: () => void }) {
    return <Button onClick={reset}>Find again</Button>;
  }
  return (
    <div>
      <NoData cta={<CTA reset={onReset} />} message="No pharmacy available" />
    </div>
  );
}

export default NoPharmacy;
