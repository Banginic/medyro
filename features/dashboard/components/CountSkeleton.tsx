import { Card } from "@/components/ui/card";

function CountSkeleton() {
  return (
    <Card className="p-4 lg:p-6 bg-muted w-48 lg:w-68 h-30">
      <p className="bg-foreground/10 h-12 w-16 mx-auto rounded animate-pulse"></p>
      <p className=" bg-foreground/10 h-4 mt-2 w-4/8 mx-auto rounded animate-pulse"></p>
    </Card>
  );
}

export default CountSkeleton;
