import {
    Activity,
    Briefcase,
    CalendarPlus,
  Church,
  Cpu,
  Handshake,
  Home,
  Hospital,
  Info,
  Mail,
  Newspaper,
  NewspaperIcon,
  Pill,


  Timer,


  Users,
} from "lucide-react";

export const mainNavlinks = [
  { label: "Home", href: "/", Icon: Cpu },
  { label: "Products", href: "/products",  },
  { label: "Services", href: "/services",  },
  { label: "Hours & On-Call", href: "/programs", },
  { label: "Team", href: "/employees",  },

];



export const mainSidelinks = [
   { label: "Home", href: "/", Icon: Home },
  { label: "Medicine & Products", href: "/products",  Icon: Pill },
  { label: "Hours & On-Call", href: "/programs",  Icon: Timer },
  { label: "Services", href: "/services",  Icon: Activity },
  { label: "Team", href: "/employees",  Icon: Users },
  { label: "Blogs", href: "/blogs", Icon: Newspaper },
  { label: "About ", href: "/about-us", Icon: Info },
  { label: "Contact", href: "/contact-us", Icon: Mail },
  { label: "News", href: "/news", Icon: NewspaperIcon },
  { label: "Career", href: "/career", Icon: Briefcase },
];
