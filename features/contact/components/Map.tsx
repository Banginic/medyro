function Map() {
  return (
    <div
  id="map"
  className="grid w-[98%] max-w-xl mx-auto text-[var(--white-color)] gap-1 h-[300px] place-items-center lg:gap-3 rounded-md"
>
  <iframe
    src="https://www.google.com/maps?q=4.0904452245349,9.664829226725802&z=18&output=embed"
    width="100%"
    height="300"
    loading="lazy"
    className="border-0 w-full h-full rounded-md"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
  );
}

export default Map;
