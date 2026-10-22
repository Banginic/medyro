import PageHeading from "@/components/share/PageHeading";
import { Card } from "@/components/ui/card";

function loading() {
  const myArray = [1, 2, 3];
  return (
    <section className="min-h-screen max-w-7xl mx-auto py-16 2xl:py-32 px-1.5 lg:px-6">
      <PageHeading
        title="Knowledge for Your Family Journey"
        subtitle="Expert articles and practical guidance on fertility, reproductive health, and family planning from the St. Sylvester care team."
      />
      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {myArray.map((index) => (
          <Card
            key={index}
            className="overflow-hidden w-[98%] mx-auto animate-pulse hover:shadow-lg transition-shadow duration-300  border-pink-400/10"
          >
            <div className="relative h-48 bg-muted">
             
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
