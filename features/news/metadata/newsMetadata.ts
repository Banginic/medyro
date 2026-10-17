const websiteURL = process.env.BASE_URL!;

const metadataDetails = {
  title:
    "Geena Pharmacy News - Latest Health Tips, Pharmacy Updates & Announcements",
  description:
    "Stay informed with the latest news from Geena Pharmacy. Discover health tips, pharmacy updates, wellness information, product announcements, and important healthcare insights.",
  authors: "Geena Pharmacy LTD",
  creator: "Geena Pharmacy LTD",
  publisher: "Geena Pharmacy LTD",
  applicationName: "Geena Pharmacy",
  og_description:
    "Explore the latest health tips, pharmacy updates, wellness advice, product announcements, and healthcare information from Geena Pharmacy.",
  twitter_og_description:
    "Stay updated with Geena Pharmacy for the latest health tips, wellness advice, pharmacy news, healthcare insights, and important announcements.",
  twitter_handler: "https://x.com/geenapharmacy",
};

export const NewsMetadata = {
  title: metadataDetails.title,
  description: metadataDetails.description,
  authors: [{ name: metadataDetails.authors, url: websiteURL + "/news" }],
  creator: metadataDetails.creator,
  metadataBase: new URL(websiteURL),
  publisher: metadataDetails.publisher,
  applicationName: metadataDetails.applicationName,

  openGraph: {
    type: "website",
    title: metadataDetails.title,
    description: metadataDetails.og_description,
    url: websiteURL + "/news",
    siteName: metadataDetails.applicationName,
    images: [
      {
        url: websiteURL + "/logo.png",
        width: 1200,
        height: 630,
        alt: "Banginic logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: metadataDetails.title,
    description: metadataDetails.twitter_og_description,
    creator: metadataDetails.twitter_handler,
    images: [websiteURL + "/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};
