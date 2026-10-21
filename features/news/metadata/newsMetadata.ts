import { createPageMetadata } from "@/metadata/createMetadata";

const metadataDetails = {
  title: "Actualités santé et pharmacie au Cameroun | Medyro",
  description:
    "Suivez les dernières actualités de Medyro : informations sur les pharmacies, conseils santé, nouveautés de la plateforme et actualités du secteur pharmaceutique au Cameroun.",
  path: "/news",
  ogDescription:
    "Restez informé avec Medyro : actualités santé, conseils pratiques et nouveautés du secteur pharmaceutique au Cameroun.",
  twitterDescription:
    "Actualités santé, conseils et nouveautés pharmacie au Cameroun, à suivre sur Medyro.",
};

export const NewsMetadata = createPageMetadata(metadataDetails);
