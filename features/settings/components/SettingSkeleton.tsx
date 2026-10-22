import { Card } from "@/components/ui/card";

function SettingSkeleton() {
  return (
    <Card className="border bg-muted p-4  rounded-md w-[95%] lg:w-2xl max-w-3xl mx-auto h-67">
      <div className="h-6 rounded w-1/3 animate-pulse bg-foreground/10 "></div>
      <div className="h-10 mt-4 rounded animate-pulse w-full bg-foreground/10 "></div>
      <div className="h-10 mt-4 rounded animate-pulse w-full bg-foreground/10 "></div>
      <div className="flex justify-end">
        <div className="h-8 mt-8 rounded w-24 animate-pulse bg-foreground/10 "></div>
      </div>
    </Card>
  );
}

export default SettingSkeleton;
