import { METADATA_DETAILS } from "./data";
import { siteConfig } from "./siteConfig";

export function createPersonStructuredData() {
  const socialProfiles = Object.values(siteConfig.social).filter(
    (url): url is string => Boolean(url),
  );

  if (siteConfig.entityType === "Organization") {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",

      name: siteConfig.name,
      url: siteConfig.url,
      logo: siteConfig.logo,
      image: siteConfig.image,

      sameAs: socialProfiles,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Person",

    name: siteConfig.author,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.image,

    jobTitle: "Journalist, Television Host, MC, and Media Personality",

    sameAs: socialProfiles,
  };
}

export function createWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: siteConfig.name,
    url: siteConfig.url,

    description: METADATA_DETAILS.projectInfo.projectDescription,
  };
}
