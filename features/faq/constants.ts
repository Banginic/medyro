import { FAQItem } from "./types";

export const faqData: FAQItem[] = [
  {
    question: "What is Medyro Pharmacy Finder?",
    answer:
      "Medyro Pharmacy Finder is a platform that helps you discover pharmacies, explore pharmacy information, and find locations where you can inquire about the medications and healthcare products you need.",
  },
  {
    question: "How can I find a pharmacy near me?",
    answer:
      "You can use Medyro's pharmacy search and location features to discover pharmacies near your current location. Enable location access when prompted or search by entering your preferred city, neighborhood, or location.",
  },
  {
    question: "Can I search for a specific medication?",
    answer:
      "Yes, you can use the available search features to look for medications and identify pharmacies that may be relevant to your needs. Contact the pharmacy directly to confirm product availability before visiting.",
  },
  {
    question: "Does Medyro guarantee that a medication is available?",
    answer:
      "No. Pharmacy listings and search results do not guarantee that a medication is currently in stock. Availability can change, so we recommend contacting the pharmacy directly before making a trip.",
  },
  {
    question: "How can I contact a pharmacy listed on Medyro?",
    answer:
      "Open the pharmacy's profile to view its available contact information. Depending on the information provided by the pharmacy, you may be able to call, send a message, or contact the pharmacy through WhatsApp.",
  },
  {
    question: "How can my pharmacy be listed on Medyro?",
    answer:
      "Pharmacy owners or authorized representatives can register their pharmacy through the pharmacy registration feature. Provide accurate business details and the requested information, then follow the verification or approval process required by Medyro.",
  },
  {
    question: "Can I update my pharmacy's information after registration?",
    answer:
      "Yes. Authorized pharmacy account holders can manage their pharmacy information through the dashboard, including details such as the pharmacy name, contact information, location, opening hours, and other supported listing information.",
  },
  {
    question: "Is Medyro a pharmacy or a healthcare provider?",
    answer:
      "Medyro is a pharmacy discovery platform that helps users connect with pharmacies. It does not replace pharmacists, doctors, or other qualified healthcare professionals. Consult an appropriate healthcare professional for medical advice.",
  },
  {
    question: "How do I report incorrect pharmacy information?",
    answer:
      "If you notice incorrect contact details, an inaccurate location, outdated opening hours, or other misleading information, contact the Medyro support team and provide the pharmacy's name and the details that need correction.",
  },
  {
    question: "Is my personal information safe when using Medyro?",
    answer:
      "Medyro should handle your personal information according to its privacy policy and applicable data protection requirements. Only provide information necessary to use the platform, review the privacy policy, and avoid sharing sensitive medical information through unsecured communication channels.",
  },
] as const;
