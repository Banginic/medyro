interface PropsType {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

function SectionHeading({ eyebrow, title, subtitle }: PropsType) {
  return (
    <div className="max-w-3xl text-center  mx-auto px-2">
      <h2 className="section-title mb-3">{title}</h2>
      <p className="subtitle text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export default SectionHeading;
