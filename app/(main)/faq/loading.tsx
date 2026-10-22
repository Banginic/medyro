import { Title } from "@/components/index";


function loading() {
  return (
    <section className={`py-16 px-4 `}>
      <div className="max-w-4xl mx-auto">
        <Title message="FAQs" />
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-muted rounded-xl shadow-lg p-8 animate-pulse"
            >
              <div className="h-6 bg-muted rounded mb-4 w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-foreground/10 rounded w-full"></div>
                <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
                <div className="h-4 bg-foreground/10 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default loading;
