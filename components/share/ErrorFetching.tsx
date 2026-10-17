"use client";

function ErrorFetching({
  retry,
  message,
}: {
  message: string;
  retry?: () => void;
}) {
  const language = process.env.NEXT_PUBLIC_LANGUAGE;
  return (
    <div className="h-full w-full grid place-items-center text-center mt-8">
      <div>
        <h1 className="card-title font-semibold ">
      
          {message}
        </h1>
        <p className="card-description mt-1">
          {language === "fr"
            ? "Vérifiez votre connexion internet et réessayez plus tard."
            : "Check your internet and try again later"}
        </p>
        <button
          // onClick={retry}
          className="text-sm border  hover:border-accent bg-secondary-foreground text-secondary py-2 px-4 cursor-pointer rounded mt-4"
        >
          {language === "fr" ? "Réessayer" : "Retry"}
        </button>
      </div>
    </div>
  );
}

export default ErrorFetching;
