ALTER TYPE "public"."verification_status" ADD VALUE 'not-verified' BEFORE 'pending';--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pharmacy_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"otp" integer NOT NULL,
	"otpConfirmation" integer,
	"whatsApp" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "verifications_whatsApp_unique" UNIQUE("whatsApp"),
	CONSTRAINT "verifications_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_pharmacy_id_pharmacies_id_fk" FOREIGN KEY ("pharmacy_id") REFERENCES "public"."pharmacies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;