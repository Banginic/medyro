import ProgramsPage from "@/features/programs/components/ProgramsPage";
import { ProgramMetadata } from "@/features/programs/metadata/programsMetadata";

export const revalidate = 86400;

export const metadata = ProgramMetadata;

function page() {
  return <ProgramsPage />;
}

export default page;
