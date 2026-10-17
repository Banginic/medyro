function CardSkeleton() {
  const myArray = [1, 2, 3,4];
  return (
    <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {myArray.map((item) => (
        <li key={item}>
          <article className="bg-card p-5 flex flex-col justify-between h-52 rounded-2xl">
            <div className="h-8 w-4/5 rounded  bg-foreground/20 animate-pulse mt-2"></div>
            <div className="h-14 w-1/2 rounded  bg-foreground/20 animate-pulse mt-2"></div>
            <div className="h-4 w-4/5 rounded  bg-foreground/20 animate-pulse mt-2"></div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default CardSkeleton;
