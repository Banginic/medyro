CREATE TYPE "public"."region" AS ENUM('adamawa', 'centre', 'east', 'far_north', 'littoral', 'north', 'north_west', 'south', 'south_west', 'west');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'profile', 'user');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TABLE "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subject" varchar(255) NOT NULL,
	"body" varchar(500) NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "on_call_schedule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"date" date NOT NULL,
	"start_time" time DEFAULT '07:00' NOT NULL,
	"end_time" time,
	"note" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "on_call_schedule_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "pharmacies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"logo" varchar(255),
	"logoPublicId" varchar(255),
	"coverImage" varchar(255),
	"coverImagePublicId" varchar(255),
	"pharmacistName" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"whatsApp" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"website" varchar(255),
	"region" "region" DEFAULT 'littoral',
	"city" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"latitude" integer,
	"longitude" integer,
	"verificationStatus" "verification_status" DEFAULT 'pending',
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "on_call_schedule" ADD CONSTRAINT "on_call_schedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pharmacies" ADD CONSTRAINT "pharmacies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;