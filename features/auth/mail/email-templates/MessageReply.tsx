

function MessageReply({
  details,
}: {
  details: { name: string; message: string };
}) {
  const whatsApp_number = process.env.WHATSAPP_NUMBER;
  const phone_number = process.env.PHONE_NUMBER;
  return (
    <section className="py-8 my-12 bg-linear-to-br border border-pink-400/20 rounded-md  w-[95%] mx-auto from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="p-4 border rounded w-[95%] mx-auto border-pink-400/20">
        <h1 className="mb-4 text-lg">Hello {details.name}!</h1>
        <p className="text-white/70">{details.message}</p>
      </div>
      <div className="p-4 border rounded w-[95%] mx-auto border-pink-400/10 mt-12">
        <p>
          Visit{" "}
          <a
            href="https://www.banginic.com"
            target="blank"
            className="text-yellow-500 underline"
          >
            https://www.banginic.com
          </a>{" "}
          for more info
        </p>
        <p>
          Write us on{" "}
          <a
            href={`https://wa.me/${whatsApp_number}?text=Hi%20I%20am%20replying%20from%20an%20email`}
            target="blank"
            className="text-green-500 underline"
          >
            WhatsApp
          </a>{" "}
          for quick reply
        </p>
        <p>
          Give us a{" "}
          <a href={`tel:${phone_number}`} className="text-blue-500 underline">
            Call
          </a>{" "}
          for quick reply
        </p>
      </div>
    </section>
  );
}

export default MessageReply;
