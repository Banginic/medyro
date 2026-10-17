import PageHeading from "@/components/share/PageHeading";

function loading() {
  return (
    <section className="min-h-screen max-w-7xl mx-auto py-16 2xl:py-32">
      <PageHeading
        title="Latest Pharmacy News & Health Updates"
        subtitle="Stay informed with the latest news, health tips, pharmacy updates, and important information from Geena Pharmacy."
      />

      <article className="grid place-items-center mt-12 border border-pink-200/30 rounded w-[96%] lg:max-w-lg p-6 mx-auto">
        <p className="h-4 w-42 bg-gray-300 animate-pulse mb-2"></p>
        <p className="text-accent text-sm text-start">
          <span className="mr-2 text-white/70">Posted Date</span>{" "}
          <span>{new Date().toLocaleDateString("en-GB")}</span>
        </p>
        <p className="border border-pink-200/30 h-16 bg-gray-300 animate-pulse text-lg rounded-lg p-4 mt-8 w-full"></p>
      </article>
    </section>
  );
}

export default loading;
