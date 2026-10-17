interface PropsType {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

function PageHeading({ eyebrow, title, subtitle }: PropsType) {
  return (
    <div className="max-w-3xl text-center  mx-auto px-2 font-display">
      <h2 className="mt-4 text-3xl  tracking-tight text-foreground md:text-4xl mb-3">{title}</h2>
      <h2 className="subtitle text-muted-foreground">{subtitle}</h2>
    </div>
  );
}

export default PageHeading;
