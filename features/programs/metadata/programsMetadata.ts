const websiteURL = process.env.BASE_URL!;

const metadataDetails = {
  title: "Geena Pharmacy Programs - Opening Hours & On-Call Schedule",
  description:
    "View Geena Pharmacy's regular opening hours, closing times, and on-call schedule. Stay informed about our availability and find out when our pharmacy is open or available on call.",
  authors: "Geena Pharmacy LTD",
  creator: "Geena Pharmacy LTD",
  publisher: "Geena Pharmacy LTD",
  applicationName: "Geena Pharmacy",
  og_description:
    "Check Geena Pharmacy's opening hours and on-call schedule. Find out when we're open and when our pharmacy team is available on call for your healthcare needs.",
  twitter_og_description:
    "Stay updated with Geena Pharmacy's opening hours and on-call schedule. Know when we're open and when we're available to serve you.",
  twitter_handler: "https://x.com/geenapharmacy",
};

export const ProgramMetadata = {
  title: metadataDetails.title,
  description: metadataDetails.description,
  authors: [{ name: metadataDetails.authors, url: websiteURL + "/products" }],
  creator: metadataDetails.creator,
  metadataBase: new URL(websiteURL),
  publisher: metadataDetails.publisher,
  applicationName: metadataDetails.applicationName,

  openGraph: {
    type: "website",
    title: metadataDetails.title,
    description: metadataDetails.og_description,
    url: websiteURL + "/products",
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
