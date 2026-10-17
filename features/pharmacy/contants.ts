import { pgEnum } from "drizzle-orm/pg-core";
import { RegionType } from "./types";


export const CAMEROON_REGIONS: RegionType[] = [
  {
    code: "AD",
    value: "adamawa",
    name: {
      en: "Adamawa",
      fr: "Adamaoua",
    },
    capital: "Ngaoundéré",
  },
  {
    code: "CE",
    value: "centre",
    name: {
      en: "Centre",
      fr: "Centre",
    },
    capital: "Yaoundé",
  },
  {
    code: "ES",
    value: "east",
    name: {
      en: "East",
      fr: "Est",
    },
    capital: "Bertoua",
  },
  {
    code: "EN",
    value: "far_north",
    name: {
      en: "Far North",
      fr: "Extrême-Nord",
    },
    capital: "Maroua",
  },
  {
    code: "LT",
    value: "littoral",
    name: {
      en: "Littoral",
      fr: "Littoral",
    },
    capital: "Douala",
  },
  {
    code: "NO",
    value: "north",
    name: {
      en: "North",
      fr: "Nord",
    },
    capital: "Garoua",
  },
  {
    code: "NW",
    value: "north_west",
    name: {
      en: "North-West",
      fr: "Nord-Ouest",
    },
    capital: "Bamenda",
  },
  {
    code: "SU",
    value: "south",
    name: {
      en: "South",
      fr: "Sud",
    },
    capital: "Ebolowa",
  },
  {
    code: "SW",
    value: "south_west",
    name: {
      en: "South-West",
      fr: "Sud-Ouest",
    },
    capital: "Buea",
  },
  {
    code: "OU",
    value: "west",
    name: {
      en: "West",
      fr: "Ouest",
    },
    capital: "Bafoussam",
  },
];

export const RegionEnum = [
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
] as const;