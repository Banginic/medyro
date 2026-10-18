"use client";
// app/dashboard/page.tsx
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Pencil,
  Pill,
  Truck,
  Stethoscope,
} from "lucide-react";
import { PharmacyType } from "../../types";

// Remplacez par vos données réelles (Drizzle / Neon)
const pharmacy = {
  name: "Pharmacie Geena",
  manager: "Dr. Marie Ngono",
  license: "PH-LT-0421",
  address: "Rue Joss, Bonanjo, Douala",
  phone: "+237 6 90 00 00 00",
  email: "contact@pharmacie-geena.cm",
  about:
    "Pharmacie de quartier ouverte à tous : médicaments sur ordonnance, produits de santé et conseils personnalisés par notre équipe de pharmaciens.",
  services: [
    { label: "Médicaments sur ordonnance", icon: Pill },
    { label: "Livraison à domicile", icon: Truck },
    { label: "Conseils pharmaceutiques", icon: Stethoscope },
  ],
  hours: [
    { day: "Lundi – Vendredi", time: "08h00 – 20h00" },
    { day: "Samedi", time: "08h00 – 18h00" },
    { day: "Dimanche", time: "Garde : 09h00 – 13h00" },
  ],
};

export default function PharmacyDashboardDetails({
  pharmacies,
}: {
  pharmacies: PharmacyType[];
}) {
  const pharmacyd = pharmacies[0];
  const initials = pharmacy.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="min-h-screen bg-emerald-50/40 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Bienvenue */}
        <header className="rounded-2xl bg-emerald-800 p-6 text-white sm:p-8">
          <p className="text-sm text-emerald-100">Tableau de bord</p>
          <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
            Bienvenue, {pharmacy.manager}
          </h1>
          <p className="mt-2 max-w-xl text-emerald-100">
            Retrouvez ici le profil de votre pharmacie et gardez vos
            informations à jour pour vos patients.
          </p>
        </header>

        {/* Profil */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-100 text-xl font-semibold text-emerald-800">
                {initials}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {pharmacy.name}
                </h2>
                <p className="flex items-center gap-1.5 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  Licence n° {pharmacy.license}
                </p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800">
              <Pencil className="h-4 w-4" />
              Modifier le profil
            </button>
          </div>

          <p className="mt-6 max-w-2xl leading-relaxed text-slate-700">
            {pharmacy.about}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {/* Coordonnées */}
            <div>
              <h3 className="font-medium text-slate-900">Coordonnées</h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {pharmacy.address}
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {pharmacy.phone}
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {pharmacy.email}
                </li>
              </ul>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="font-medium text-slate-900">
                Horaires d’ouverture
              </h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-700">
                {pharmacy.hours.map((h) => (
                  <li key={h.day} className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>
                      <span className="font-medium">{h.day}</span>
                      <br />
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-medium text-slate-900">Services proposés</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pharmacy.services.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-900"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
