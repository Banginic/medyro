import AboutMedyroPage from "@/features/about/components/AboutPage";
import { AboutMetadata } from "@/features/about/metadata/aboutMetadata";

export const metadata = AboutMetadata


function page() {
  return (
    <div>
      <AboutMedyroPage />
    </div>
  )
}

export default page