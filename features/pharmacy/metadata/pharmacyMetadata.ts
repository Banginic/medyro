import { createPageMetadata } from "@/metadata/createMetadata";

const metadataDetails = {
  title: "Trouver une pharmacie au Cameroun | Medyro",
  description:
    "Recherchez une pharmacie par nom, ville ou quartier, ou utilisez votre localisation pour trouver les pharmacies les plus proches de vous au Cameroun. Consultez leurs adresses, leurs horaires et contactez-les en quelques clics avec Medyro.",
  path: "/find-pharmacies",
  ogDescription:
    "Trouvez en quelques secondes la pharmacie la plus proche de vous au Cameroun. Recherchez par nom, ville ou quartier, ou partagez votre position avec Medyro.",
  twitterDescription:
    "Recherchez une pharmacie près de vous au Cameroun par nom, ville ou localisation avec Medyro. Adresses, horaires et contacts à portée de main.",
};

export const PharmacyMetadata = createPageMetadata(metadataDetails);

const PharmaciesMetadataDetails = {
  title: "Liste des pharmacies au Cameroun | Medyro",
  description:
    "Parcourez toutes les pharmacies référencées sur Medyro au Cameroun. Filtrez par ville ou quartier, consultez les adresses, les horaires d'ouverture et les contacts pour trouver la pharmacie qui vous convient.",
  path: "/pharmacies",
  ogDescription:
    "Découvrez les pharmacies référencées sur Medyro partout au Cameroun : adresses, horaires et contacts réunis au même endroit.",
  twitterDescription:
    "Toutes les pharmacies du Cameroun référencées sur Medyro : adresses, horaires et contacts à portée de main.",
};

export const PharmaciesMetadata = createPageMetadata(PharmaciesMetadataDetails);
