import { Card } from "@/components/ui/card";

function CountError() {
  return (
    <Card className="p-4 lg:p-6 bg-muted w-48 lg:w-68 h-30">
        <h2 className='text-center text-4xl lg:text-5xl font-semibold'>0</h2>
        <p className=' text-center subtitle danger'>Error</p>
    </Card>
  );
}

export default CountError;
