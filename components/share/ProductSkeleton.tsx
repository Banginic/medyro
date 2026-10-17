function ProductSkeleton() {
  const myArray = [1, 2, 3];
  return (
    <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {myArray.map((item) => (
        <li key={item}>
          <article className="bg-card pb-2 rounded-2xl">
            <div className="h-52 w-full bg-foreground/20 animate-pulse rounded-2xl"></div>
            <div className="h-6 w-4/5 rounded mx-auto bg-foreground/20 animate-pulse mt-2"></div>
            <div className="h-6 w-1/2 rounded mx-auto bg-foreground/20 animate-pulse mt-2"></div>
            <div className="h-6 w-1/4 rounded mx-auto bg-foreground/20 animate-pulse mt-2"></div>
            <div className="h-14 w-[95%] rounded mx-auto bg-foreground/20 animate-pulse mt-2"></div>
          </article>
        </li>
      ))}
      
    </ul>
  );
}

export default ProductSkeleton;
