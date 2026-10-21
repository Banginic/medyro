import { createPageMetadata } from "@/metadata/createMetadata";

const metadataDetails = {
  title:
    "À propos de Medyro - La plateforme de recherche de pharmacies au Cameroun",
  description:
    "Découvrez Medyro, la plateforme camerounaise qui simplifie l'accès aux soins en vous aidant à trouver rapidement une pharmacie ouverte ou de garde près de vous. Notre mission : rapprocher les patients et les pharmacies partout au Cameroun.",
  path: "/about-medyro",
  ogDescription:
    "Medyro, c'est une équipe engagée pour faciliter l'accès aux pharmacies au Cameroun. Découvrez notre mission, notre vision et pourquoi nous avons créé cette plateforme.",
  twitterDescription:
    "Qui est derrière Medyro ? Découvrez notre mission : aider chaque Camerounais à trouver une pharmacie ouverte près de lui, rapidement et simplement.",
};

export const AboutMetadata = createPageMetadata(metadataDetails);
