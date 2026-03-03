CREATE TABLE "ratings" (
	"userId" text NOT NULL,
	"movieId" varchar(255) NOT NULL,
	"rating" integer NOT NULL,
	"title" text NOT NULL,
	"posterPath" text,
	CONSTRAINT "ratings_userId_movieId_pk" PRIMARY KEY("userId","movieId")
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "posterPath" text;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "voteAverage" text;--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "posterPath" text;--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "voteAverage" text;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;