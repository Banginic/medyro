ALTER TABLE "on_call_schedule" DROP CONSTRAINT "on_call_schedule_pharmacy_id_pharmacies_id_fk";
--> statement-breakpoint
ALTER TABLE "on_call_schedule" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "on_call_schedule" ADD CONSTRAINT "on_call_schedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "on_call_schedule" DROP COLUMN "pharmacy_id";