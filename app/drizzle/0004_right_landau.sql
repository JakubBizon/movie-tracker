ALTER TABLE "bookmarks" ADD COLUMN "releaseDate" date;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "releaseDate" date;--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "updatedAt" timestamp DEFAULT now();