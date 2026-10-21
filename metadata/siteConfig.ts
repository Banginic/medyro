import { METADATA_DETAILS } from "./data";

export const siteConfig = {
  name: METADATA_DETAILS.projectInfo.name,
  author: METADATA_DETAILS.projectInfo.author,
  url: METADATA_DETAILS.projectInfo.url,
  entityType: METADATA_DETAILS.entityType,
  logo: METADATA_DETAILS.projectInfo.logo,
  image: METADATA_DETAILS.projectInfo.image,

  social: {
    facebook: METADATA_DETAILS.socialMediaLinks.facebook,
    instagram: METADATA_DETAILS.socialMediaLinks.instagram,
    tiktok: METADATA_DETAILS.socialMediaLinks.tiktok,
    x: METADATA_DETAILS.socialMediaLinks.x,
    youtube: METADATA_DETAILS.socialMediaLinks.youtube,
    linkedin: METADATA_DETAILS.socialMediaLinks.linkedin,
  },
  twitterHandle: METADATA_DETAILS.socialMediaLinks.twitterHandle,
};
