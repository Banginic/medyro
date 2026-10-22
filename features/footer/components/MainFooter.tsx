"use client";
import Link from "next/link";
import { Logo } from "@/components/index";
import { useQuery } from "@tanstack/react-query";
import { projectDetails } from "@/constants/project-details";
import { getProfile } from "@/features/profiles/actions/getProfile";
import DeveloperLink from "./DeveloperLink";
import SocialLinks from "./SocialLinks";

// Edit cities and routes to match your app.
const CITIES = [
  "Douala",
  "Yaoundé",
  "Bafoussam",
  "Bamenda",
  "Garoua",
  "Maroua",
  "Bertoua",
  "Ngaoundéré",
  "Limbe",
  "Kribi",
  "Buea",
  "Ebolowa",
];

const LINK_GROUPS = [
  {
    title: "Find",
    links: [
      { label: "All pharmacies", href: "/find-pharmacies" },
      { label: "On duty now", href: "/find-pharmacies" },
      { label: "Open now", href: "/find-pharmacies" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact us", href: "/support" },
      { label: "List your pharmacy", href: "/pharmacies/register-pharmacy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/footer/privacy" },
      { label: "Terms of Service", href: "/footer/terms" },
      { label: "Cookie Policy", href: "/footer/cookies" },
    ],
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden";

const MainFooter = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const profile = data?.data[0];
  const PROJECT_DATA = profile || projectDetails;

  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL!;

  return (
    <footer className="border-t border-accent bg-[#063b2e] rounded-t-3xl page-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        {/* Statement + city grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 pb-14">
          <div className="flex flex-col items-start gap-6">
            <Logo logoSize={170} textSize="text-xl lg:text-2xl" />

            <h2 className="max-w-md text-2xl sm:text-3xl font-semibold leading-tight text-primary-foreground">
              Find the pharmacy that's open, wherever you are.
            </h2>

            <Link
              href="/find-pharmacies"
              className={`inline-flex items-center gap-2.5 rounded-full border border-accent/60 bg-white/5 px-4 py-2 text-sm text-primary-foreground hover:bg-white/10 transition-colors ${focusRing}`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Pharmacies on duty now
            </Link>

            <SocialLinks profile={profile} />
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary-foreground">
              Browse by city
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/find-pharmacies?city=${encodeURIComponent(city)}`}
                    className={`inline-block rounded-full border border-accent/60 px-4 py-2 text-sm text-primary-foreground/90 hover:border-golden hover:text-golden transition-colors ${focusRing}`}
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compact link groups */}
        <div className="border-t border-accent/60 py-10 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="mb-3 text-sm font-semibold text-primary-foreground">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={`text-sm text-primary-foreground/75 hover:text-golden transition-colors rounded-sm ${focusRing}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-accent/60 pt-6 flex flex-col md:flex-row gap-3 justify-between items-center">
          <p className="text-xs text-primary-foreground/75 text-center md:text-left">
            <Link
              href={adminUrl}
              className="hover:text-white transition-colors"
              aria-label="Admin"
            >
              © {new Date().getFullYear()}
            </Link>{" "}
            {PROJECT_DATA.projectName}. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/60 text-center md:text-right max-w-md">
            Always confirm opening hours with the pharmacy before you travel.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <DeveloperLink />
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;