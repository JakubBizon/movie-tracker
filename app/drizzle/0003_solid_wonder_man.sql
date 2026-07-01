CREATE TABLE "reviews" (
	"userId" text NOT NULL,
	"movieId" varchar(255) NOT NULL,
	"review" text NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "reviews_userId_movieId_pk" PRIMARY KEY("userId","movieId")
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;