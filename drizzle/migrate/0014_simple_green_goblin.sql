CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author" varchar(255) DEFAULT '' NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"likes" varchar(255) DEFAULT '12k' NOT NULL,
	"body" varchar(1000) DEFAULT '' NOT NULL,
	"slug" varchar(100) NOT NULL,
	"photo" varchar(255) DEFAULT '' NOT NULL,
	"photo_public_id" varchar(255) DEFAULT '' NOT NULL,
	"avatar" varchar(255) DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
