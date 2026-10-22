import { place_holder_image } from "@/assets/photos";
import { Card } from "@/components/ui/card";
import Image from "next/image";


function loading() {
  const myArray = [1];
  return (
    <section className="min-h-screen pb-24">
      <div className="mt-12 max-w-xl mx-auto px-6 py-12">
        {myArray.map((index) => (
          <Card
            key={index}
            className="overflow-hidden w-[98%] mx-auto animate-pulse hover:shadow-lg transition-shadow duration-300  border-pink-400/10"
          >
            <div className="relative h-52 lg:h-80 ">
              <Image
                src={place_holder_image}
                alt="Banginic"
                className="w-full h-full object-cover opacity-70 animate-pulse"
              />
            </div>
            <div className="p-6 bg-muted">
              <p className="h-4 w-42 bg-foreground/20"></p>
              <p className="h-3 mt-2 w-16 bg-foreground/20"></p>
              <p className="h-12 mt-3 w-full bg-foreground/20 animate-pulse"></p>
              <div className="mt-4 flex justify-between">
                <p className="h-8 rounded mt-2 w-12 bg-foreground/20"></p>
                <p className="h-8 mt-3 rounded w-24 bg-foreground/20 animate-pulse"></p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default loading;