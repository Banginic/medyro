

function DeveloperLink() {
  return (
    <a
      title="Visit the developer"
      aria-label="Développé par Banginic"
      href="https://www.banginic.com"
      target="blank"
      className="text-sm space-x-2 mx-auto border mt-8 lg:mt-0 border-ring/20 hover:border-indigo-100 p-2 rounded trans"
    >
      <span className="text-xs text-muted">Developed by</span>
      <div className="flex items-center gap-2">
        <img
          loading="lazy"
          src={"/banginic_logo.png"}
          width={25}
          height={32}
          alt="website developer Cameroon"
        />
        <span className="text-primary-foreground">Banginic</span>
      </div>
    </a>
  );
}

export default DeveloperLink;
