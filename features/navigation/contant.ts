import {
  CircleHelp,
  Headset,
  House,
  Info,
  MapPin,
  NotebookPen,
} from "lucide-react";

export const mainNavlinks = [
  { label: "Find Pharmacies", href: "/find-pharmacies",  },
  { label: "Support", href: "/support",  },
  { label: "Blogs", href: "/blogs",  },
  { label: "About", href: "/about-medyro", },

];



export const mainSidelinks = [
  { label: "Home", href: "/", Icon: House },
  { label: "Find Pharmacies", href: "/find-pharmacies", Icon: MapPin },
  { label: "Support", href: "/support", Icon: Headset },
  { label: "Blogs", href: "/blogs", Icon: NotebookPen },
  { label: "FAQs", href: "/faq", Icon: CircleHelp },
  { label: "About", href: "/about-medyro", Icon: Info },
];
