function Loading() {
  return (
    <div className="h-12 2xl:h-16 w-full border animate-pulse border-foreground/10 bg-linear-to-r from-card to-foreground/10"></div>
  );
}

export default function TableSkeleton({width}: {width?: string}) {
  return (
    <div className={`w-full  mx-auto`}>
      <div className="h-12 2xl:h-16 w-full bg-foreground/20 animate-pulse "></div>
      {[1, 2, 3, 4].map((item) => (
        <Loading key={item} />
      ))}
      <div className="fixed inset-0 bg-linear-to-b from-transparent via-background/30 to-background"></div>
    </div>
  );
}
