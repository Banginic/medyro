const websiteURL =
  process.env.BASE_URL! ;

const metadataDetails = {
  title:
    "Geena Pharmacy LTD - Quality Medicines, Trusted Care & Better Health in Douala, Cameroon",

  description:
    "Welcome to Geena Pharmacy LTD. We provide quality medicines, professional pharmaceutical services, health products, and personalized care to individuals and families in Douala, Cameroon.",

  authors: "Geena Pharmacy LTD",
  creator: "Geena Pharmacy LTD",
  publisher: "Geena Pharmacy LTD",
  applicationName: "Geena Pharmacy LTD",

  og_description:
    "Discover Geena Pharmacy in Douala, Cameroon. Access quality medicines, trusted pharmaceutical care, health products, and reliable pharmacy services for you and your family.",

  twitter_og_description:
    "Geena Pharmacy provides quality medicines, trusted pharmaceutical services, and personalized healthcare support to individuals and families in Douala, Cameroon.",

  twitter_handler: "https://x.com/geenapharmacy", // Replace with your official X profile
};

export const HomeMetadata = {
  title: metadataDetails.title,
  description: metadataDetails.description,
  authors: [{ name: metadataDetails.authors, url: websiteURL }],
  creator: metadataDetails.creator,
  metadataBase: new URL(websiteURL),
  publisher: metadataDetails.publisher,
  applicationName: metadataDetails.applicationName,

  openGraph: {
    type: "website",
    title: metadataDetails.title,
    description: metadataDetails.og_description,
    url: websiteURL,
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
