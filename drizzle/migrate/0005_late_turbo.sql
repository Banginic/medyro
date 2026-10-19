CREATE TABLE "open_hours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId_id" uuid,
	"isActive" boolean DEFAULT true NOT NULL,
	"schedule" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "open_hours" ADD CONSTRAINT "open_hours_userId_id_users_id_fk" FOREIGN KEY ("userId_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;