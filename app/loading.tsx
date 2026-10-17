
import Image from "next/image";

import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <div className=" text-foreground grid min-[68dvh] place-items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Image
          src={'/logo.png'}
          alt="Banginic Loading..."
          width={150}
          height={150}
          priority
          className="animate-pulse"
        />
        <LoaderCircle  className="size-14 text-accent animate-spin"/>
      </div>
    </div>
  );
}

export default Loading;
