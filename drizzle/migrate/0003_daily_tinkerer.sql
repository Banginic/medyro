ALTER TABLE "pharmacies" ALTER COLUMN "region" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "pharmacies" ALTER COLUMN "region" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "pharmacies" ALTER COLUMN "region" SET NOT NULL;