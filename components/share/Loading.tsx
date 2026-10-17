import Spiner from "./Spiner";

function Loading() {
  return (
    <div className="mt-32 w-full">
      <div className="heading3  text-center flex justify-center gap-6 flex-col items-center">
        <div>
          <Spiner />
          <h1 className="animate-pulse text-blue-400 text:lg xl:text-2xl">
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Loading;
