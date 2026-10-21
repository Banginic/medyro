import {
  Activity,
  Cpu,
  Home,
  Pill,
  Timer,
} from "lucide-react";

export const mainNavlinks = [
  { label: "Find Pharmacies", href: "/find-pharmacies",  },
  { label: "Support", href: "/support",  },
  { label: "About", href: "/about-medyro", },

];



export const mainSidelinks = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Find Pharmacies", href: "/find-pharmacies",  Icon: Pill },
  { label: "Support", href: "/support",  Icon: Timer },
  { label: "About", href: "/about-medyro",  Icon: Activity },
];
