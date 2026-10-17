import { pgEnum } from "drizzle-orm/pg-core";
import { APIResponse, PaginationType } from "@/models/types";

export type PharmacyStatusType = "on_call" | "open" | "closed" | "unconfirmed";
export type VerificationStatusType = "pending" | "verified" | "rejected";
export const VerificationStatusEnum = ["pending", "verified", "rejected"] as const;


export const cameroonRegionEnum = pgEnum("cameroon_region", [
  "adamawa",
  "centre",
  "east",
  "far_north",
  "littoral",
  "north",
  "north_west",
  "south",
  "south_west",
  "west",
]);

export type CameroonRegion = (typeof cameroonRegionEnum.enumValues)[number];
export interface RegionType {
  code: string;
  value: CameroonRegion;
  name: {
    en: string;
    fr: string;
  };
  capital: string;
}

export interface PharmacyType {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  logoPublicId?: string;
  coverImage?: string;
  coverImagePublicId?: string;
  pharmacistName?: string;
  phone: string;
  whatsApp?: string;
  email?: string;
  website?: string;
  region?: CameroonRegion;
  city: string;
  address: string;
  latitude: number;
  longitude?: number;
  status: PharmacyStatusType;
  verificationStatus?: VerificationStatusType;
  isActive?: boolean;
  createdAt?: Date;
}

export interface PharmacyTypes extends APIResponse {
  data: PharmacyType[] | [];
  pagination?: PaginationType;
}

export const SAMPLE_PHARMACIES: PharmacyType[] = [
  {
    id: "1",
    name: "Pharmacie du Centre",
    city: "Douala",
    address: "Akwa",
    phone: "+237 600 000 001",
    status: "on_call",
    verificationStatus: "verified",
    latitude: 4.0469,
    longitude: 9.6995,
  },
  {
    id: "2",
    name: "Pharmacie de Bonamoussadi",
    city: "Douala",
    address: "Bonamoussadi",
    phone: "+237 600 000 002",
    status: "on_call",
    verificationStatus: "verified",
    latitude: 4.0897,
    longitude: 9.7421,
  },
  {
    id: "3",
    name: "Pharmacie du Marché",
    city: "Yaoundé",
    address: "Centre-ville",
    phone: "+237 600 000 003",
    status: "unconfirmed",
    verificationStatus: "verified",
    latitude: 3.8667,
    longitude: 11.5167,
  },
  {
    id: "4",
    name: "Pharmacie de Bastos",
    city: "Yaoundé",
    address: "Bastos",
    phone: "+237 600 000 004",
    status: "open",
    verificationStatus: "verified",
    latitude: 3.8935,
    longitude: 11.5112,
  },

  {
    id: "6",
    name: "Pharmacie Mile One",
    city: "Bamenda",
    address: "Commercial Avenue",
    phone: "+237 600 000 006",
    status: "on_call",
    verificationStatus: "verified",
    latitude: 5.9631,
    longitude: 10.1591,
  },
  {
    id: "7",
    name: "Pharmacie Molyko",
    city: "Buea",
    address: "Molyko",
    phone: "+237 600 000 007",
    status: "open",
    verificationStatus: "verified",
    latitude: 4.1527,
    longitude: 9.2905,
  },
];

export const CITIES = [
  "Douala",
  "Yaoundé",
  "Bafoussam",
  "Bamenda",
  "Garoua",
  "Maroua",
  "Ngaoundéré",
  "Bertoua",
  "Limbe",
  "Buea",
];

export type QuickFilter = "all" | "on_call" | "open" | "verified";

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function filterPharmacies(
  list: PharmacyType[],
  query: string,
  filter: QuickFilter,
): PharmacyType[] {
  const q = norm(query);
  return list.filter((p) => {
    if (q && !norm(`${p.name} ${p.city} ${p.address}`).includes(q))
      return false;
    if (filter === "on_call") return p.status === "on_call";
    if (filter === "open") return p.status === "open" || p.status === "on_call";
    if (filter === "verified") return p.verificationStatus;
    return true;
  });
}

export function directionsUrl(p: PharmacyType): string {
  const dest =
    p.latitude != null && p.longitude != null
      ? `${p.latitude},${p.longitude}`
      : `${p.name}, ${p.address}, ${p.city}, Cameroon`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
}

export function distanceKm(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number },
): number {
  const R = 6371,
    r = Math.PI / 180;
  const dlatitude = (b.latitude - a.latitude) * r,
    dlongitude = (b.longitude - a.longitude) * r;
  const h =
    Math.sin(dlatitude / 2) ** 2 +
    Math.cos(a.latitude * r) *
      Math.cos(b.latitude * r) *
      Math.sin(dlongitude / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
