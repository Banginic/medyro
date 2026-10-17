function PausedData() {
  const language = process.env.NEXT_PUBLIC_LANGUAGE;
  return (
    <section className="grid place-items-center mt-8 mx-auto rounded-md bg-secondary/50 p-6 border-accent min-w-80 max-w-sm">
      <div className="text-center ">
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <h3 className="text-lg font-semibold animate-pulse text-foreground mb-2">
          Please wait .....
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {language === "fr"
            ? "Vérifiez votre connexion internet et réessayez plus tard."
            : "Check your internet and try again later"}
        </p>
      </div>
    </section>
  );
}

export default PausedData;
