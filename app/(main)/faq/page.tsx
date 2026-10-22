import FaqPage from "@/features/faq/components/FaqPage";
import { FaqMetadata } from "@/features/faq/metadata/faqMetadata";

export const metadata = FaqMetadata;

async function FAQ() {
  return <FaqPage />;
}
export default FAQ;
