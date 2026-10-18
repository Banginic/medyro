ALTER TABLE "on_call_schedule" DROP CONSTRAINT "on_call_schedule_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "pharmacies" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pharmacies" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pharmacies" ALTER COLUMN "pharmacistName" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "on_call_schedule" ADD COLUMN "pharmacy_id" uuid;--> statement-breakpoint
ALTER TABLE "on_call_schedule" ADD CONSTRAINT "on_call_schedule_pharmacy_id_pharmacies_id_fk" FOREIGN KEY ("pharmacy_id") REFERENCES "public"."pharmacies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "on_call_schedule" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "pharmacies" ADD CONSTRAINT "pharmacies_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "pharmacies" ADD CONSTRAINT "pharmacies_phone_unique" UNIQUE("phone");--> statement-breakpoint
ALTER TABLE "pharmacies" ADD CONSTRAINT "pharmacies_whatsApp_unique" UNIQUE("whatsApp");--> statement-breakpoint
ALTER TABLE "pharmacies" ADD CONSTRAINT "pharmacies_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "pharmacies" ADD CONSTRAINT "pharmacies_website_unique" UNIQUE("website");