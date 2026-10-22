CREATE TABLE "contact_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"whats_app" varchar(255) DEFAULT '' NOT NULL,
	"email" varchar(255) DEFAULT '' NOT NULL,
	"phone" varchar(255) DEFAULT '' NOT NULL,
	"facebook" varchar(255) DEFAULT '' NOT NULL,
	"instagram" varchar(255) DEFAULT '' NOT NULL,
	"tiktok" varchar(255) DEFAULT '' NOT NULL,
	"you_tube" varchar(255) DEFAULT '' NOT NULL,
	"twitter" varchar(255) DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"country" varchar(255) DEFAULT '' NOT NULL,
	"state" varchar(255) DEFAULT '' NOT NULL,
	"city" varchar(255) DEFAULT '' NOT NULL,
	"address" varchar(255) DEFAULT '' NOT NULL,
	"currency" varchar(255) DEFAULT 'USD' NOT NULL,
	"language" varchar(255) DEFAULT 'English (United States)' NOT NULL,
	"map_pin" jsonb DEFAULT '{"lat":"","lgn":""}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_name" varchar(255) DEFAULT '' NOT NULL,
	"tag_line" varchar(255) DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact_details" ADD CONSTRAINT "contact_details_project_id_project_info_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project_info"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location" ADD CONSTRAINT "location_project_id_project_info_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project_info"("id") ON DELETE cascade ON UPDATE no action;