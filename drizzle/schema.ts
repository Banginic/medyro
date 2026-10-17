import {
  pgTable,
  varchar,
  boolean,
  integer,
  jsonb,
  timestamp,
  uuid,
  text,
  time,
  date,
  unique,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("client"),
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
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  logo: varchar({ length: 255 }),
  logoPublicId: varchar({ length: 255 }),
  coverImage: varchar({ length: 255 }),
  coverImagePublicId: varchar({ length: 255 }),
  pharmacistName: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  whatsApp: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  website: varchar({ length: 255 }),
  region: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  latitude: varchar({ length: 255 }),
  longitude: varchar({ length: 255 }),
  verificationStatus: varchar({ length: 255 }).default('pending'),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const onCallSchedule = pgTable("on_call_schedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: date("date", { mode: "date" }).notNull().unique(),
  startTime: time("start_time").notNull().default("07:00"), // when on-call kicks in (after normal close)
  endTime: time("end_time"), // nullable = until morning/next open
  note: varchar("note", { length: 255 }), // e.g. "Emergency line only"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});