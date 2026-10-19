CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(25) NOT NULL,
	"email" varchar(30) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"subject" varchar(50) NOT NULL,
	"body" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
