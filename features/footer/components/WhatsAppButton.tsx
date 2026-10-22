// components/WhatsAppButton.tsx
"use client";

import Image from "next/image";
import { projectDetails } from "@/constants/project-details";

const WhatsAppButton = () => {


  const whatsappLink = `https://wa.me/${projectDetails.whatsApp}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Message us on whatsApp"
      className="fixed bottom-20 right-2  z-50 bg-green-600/20 text-white p-2 rounded-full shadow-lg hover:bg-green-600/40 transition-all animate-pulse"
    >
     <Image
     src={'/icons/whatsApp.png'}
     width={40}
     height={40}
     alt="./placeholder.png"
     className=""
     />
    </a>
  );
};

export default WhatsAppButton;