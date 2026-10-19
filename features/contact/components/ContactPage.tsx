import ContactForm from "../forms/ContactForm";
import ContactCard from "./ContactCard";

import Map from "./Map";

function ContactPage() {
  return (
    <div className="max-w-6xl 2xl:max-w-7xl mt-12 2xl:mt-16 mx-auto px-2">
    
      <div className="flex flex-col justify-between gap-8 md:flex-row mt-12">
        <div className="flex-1 space-y-4 max-w-lg">
          <ContactCard />
          <Map />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactPage;
