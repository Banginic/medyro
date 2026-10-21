import type { Metadata } from "next";
import {siteConfig } from './siteConfig'

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  ogDescription?: string;
  twitterDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  ogDescription,
  ogImage,
  ogImageAlt,
}: PageMetadata): Metadata {
  const url = `${siteConfig.url}${path}`;

  const image = ogImage ?? siteConfig.image;

  return {

    title,
    description,

    alternates: {
      canonical: path,
    },

    openGraph: {
      type: "website",
      title,
      description: ogDescription ?? description,
      url,
      siteName: siteConfig.name,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? title,
        },
      ],
    },

 
  };
}