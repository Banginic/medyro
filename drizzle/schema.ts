import { UserRoleEnum } from "@/features/auth/types";
import {OpeningHourType } from "@/features/opening-hours/schemas/OpeningHoursSchema";
import { RegionEnum } from "@/features/pharmacy/contants";
import { VerificationStatusEnum } from "@/features/pharmacy/types";
import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  uuid,
  time,
  date,
  pgEnum,
  doublePrecision,
  jsonb,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", UserRoleEnum);
export const regionEnum = pgEnum("region", RegionEnum);
export const verificationStatusEnum = pgEnum(
  "verification_status",
  VerificationStatusEnum,
);

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 30 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  subject: varchar("subject", { length: 50 }).notNull(),
  body: varchar("body", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: userRoleEnum().notNull().default("user"),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const news = pgTable("news", {
  id: uuid("id").defaultRandom().primaryKey(),
  subject: varchar({ length: 255 }).notNull(),
  body: varchar({ length: 500 }).notNull(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pharmacies = pgTable("pharmacies", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: varchar({ length: 255 }).notNull().unique(),
  slug: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  logo: varchar({ length: 255 }),
  logoPublicId: varchar({ length: 255 }),
  coverImage: varchar({ length: 255 }),
  coverImagePublicId: varchar({ length: 255 }),
  pharmacistName: varchar({ length: 255 }),
  phone: varchar({ length: 255 }).notNull().unique(),
  whatsApp: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  website: varchar({ length: 255 }).unique(),
  city: varchar({ length: 255 }).notNull(),
  region: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  verificationStatus: verificationStatusEnum().default("pending"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const onCallSchedule = pgTable("on_call_schedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  date: date("date", { mode: "date" }).notNull(),
  startTime: time("start_time").notNull().default("07:00"), // when on-call kicks in (after normal close)
  endTime: time("end_time"), // nullable = until morning/next open
  note: varchar("note", { length: 255 }), // e.g. "Emergency line only"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const openingHours = pgTable("open_hours", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  isActive: boolean().notNull().default(true),
  schedule: jsonb("schedule").$type<OpeningHourType[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
