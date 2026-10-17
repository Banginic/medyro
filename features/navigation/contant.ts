import {
  Activity,
  Cpu,
  Home,
  Pill,
  Timer,
} from "lucide-react";

export const mainNavlinks = [
  { label: "Home", href: "/", Icon: Cpu },
  { label: "Find Pharmacies", href: "/find-pharmacies",  },
  { label: "Pharmacies On-Call", href: "/pharmacies-on-call",  },
  { label: "About Medyro", href: "/about-medyro", },

];



export const mainSidelinks = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Find Pharmacies", href: "/find-pharmacies",  Icon: Pill },
  { label: "Pharmacies On-Call", href: "/pharmacies-on-call",  Icon: Timer },
  { label: "About Medyro", href: "/about-medyro",  Icon: Activity },
];
