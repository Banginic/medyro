import { Card } from "@/components/ui/card";
import Image from "next/image";
import { place_holder_image } from "@/assets/photos";

function BlogSkeleton() {
  const myArray = [1, 2, 3];
  return (
      <section className="max-w-7xl mx-auto py-12">
      <div className=" grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {myArray.map((index) => (
          <Card
            key={index}
            className="overflow-hidden w-[98%] mx-auto animate-pulse hover:shadow-lg transition-shadow duration-300  "
          >
            <div className="relative h-52">
              <Image
                src={place_holder_image}
                alt="Banginic"
                className="w-full h-full object-cover opacity-30 animate-pulse"
              />
            </div>
            <div className="p-6 bg-foreground/10">
              <p className="h-4 w-22 bg-foreground/10"></p>
              <p className="h-14 mt-2 w-full bg-foreground/10"></p>
              <p className="h-5 mt-3 w-16 rounded bg-foreground/10 animate-pulse"></p>
            </div>
          </Card>
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/70 to-background"></div>
    </section>
  );
}

export default BlogSkeleton;
