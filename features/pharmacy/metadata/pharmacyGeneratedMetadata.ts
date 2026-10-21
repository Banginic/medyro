import { METADATA_DETAILS } from "@/metadata/data";
import { PharmacyType } from "../types";

export function PharmacyGeneratedMetadata(pharmacy: PharmacyType) {
  const fullUrl = `${METADATA_DETAILS.projectInfo.url}/pharmacies/${pharmacy.slug}`;
  const image =
    pharmacy.logo || `${METADATA_DETAILS.projectInfo.url}/og-image.png`;
  const author = METADATA_DETAILS.projectInfo.author;

  return {
    title: `${pharmacy.name} - ${METADATA_DETAILS.projectInfo.name}`,
    description: pharmacy.description.slice(0, 150),
    alternates: {
      canonical: `/pharmacies/${pharmacy.slug}`,
    },

    openGraph: {
      type: "article",
      title: `${pharmacy.name} - ${METADATA_DETAILS.projectInfo.name}`,
      description: pharmacy.description.slice(0, 150),
      url: fullUrl,
      siteName: METADATA_DETAILS.projectInfo.name,
      publishedTime: new Date(),
      authors: [author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${pharmacy.name} - ${METADATA_DETAILS.projectInfo.name}`,
        },
      ],
    },
  };
}
