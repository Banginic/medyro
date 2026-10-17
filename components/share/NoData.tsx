'use client'

import { Card } from "../ui/card";

function NoData({ message }: { message: string }) {

  return (
    <Card className="grid place-items-center mt-8 mx-auto rounded-md border-0 p-8  min-[95%] max-w-lg">
      <div className="text-center ">
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {message}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
         Try again later
        </p>
      </div>
    </Card>
  );
}

export default NoData;
