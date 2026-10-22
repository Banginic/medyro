export const websiteURL = process.env.BASE_URL!;

export const METADATA_DETAILS = {
  projectInfo: {
    name: "Medyro Pharmacy Finder",
    author: "Medyro",
    url: websiteURL,
    logo: `${websiteURL}/logo.png`,
    image: `${websiteURL}/og-image.png`,
    projectDescription:
      "Find nearby pharmacies quickly and easily with Medyro. Discover pharmacy locations and access essential pharmacy information wherever you are.",
  },

  entityType: "Organization" as "Person" | "Organization",

  socialMediaLinks: {
    facebook: "https://www.facebook.com/profile.php?id=61594864733322",
    instagram: 'https://www.instagram.com/@medyro',
    tiktok: undefined,
    linkedin: undefined,
    x: undefined,
    youtube: undefined,
    twitterHandle: undefined, //e.g @banginic
    youtubeChannelID: undefined,
  },
};
