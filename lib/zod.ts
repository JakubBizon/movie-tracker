import * as z from "zod/mini";
import { SORT_OPTIONS } from "@/app/types/list-tabs-sort-options";

export const signUpSchema = z
  .object({
    email: z.email("Invalid email adress"),
    password: z
      .string()
      .check(z.minLength(8, "Password has to contain at least 8 characters")),
    confirmPassword: z.string(),
  })
  .check(
    z.refine((data) => data.password === data.confirmPassword, {
      message: "Password don't match",
      path: ["confirmPassword"],
    }),
  );

export const signInSchema = z.object({
  email: z.email("Invalid email adress"),
  password: z.string().check(z.minLength(1, "Password is required")),
});

export const reviewSchema = z.object({
  content: z
    .string()
    .check(z.minLength(1, "Review content is required"))
    .check(
      z.maxLength(2400, "Review content must be less than 2400 characters"),
    ),
});

export const userNameSchema = z.object({
  userName: z
    .string()
    .check(z.minLength(1, "Username has to contain at least 1 character"))
    .check(z.maxLength(20, "Username has to contain less than 20 characters")),
});

const movieBaseSchema = z.object({
  movieId: z.string(),
  title: z.string(),
  posterPath: z.nullable(z.optional(z.string())),
  voteAverage: z.nullable(z.optional(z.string())),
  releaseDate: z.nullable(z.optional(z.string())),
});

export const importSchema = z.object({
  schemaVersion: z.literal(1),
  data: z.object({
    favorites: z.array(movieBaseSchema),
    bookmarks: z.array(movieBaseSchema),
    ratings: z.array(
      z.extend(movieBaseSchema, {
        rating: z.coerce.number().check(z.minimum(1), z.maximum(10), z.int()),
      }),
    ),
  }),
});

export type ImportData = z.infer<typeof importSchema>["data"];

export const listParamsSchema = z.object({
  tab: z.catch(z.enum(["favorites", "watchlist"]), "watchlist"),
  sort: z.catch(z.enum(SORT_OPTIONS), "added_desc"),
  page: z.catch(z.pipe(z.coerce.number(), z.int().check(z.minimum(1))), 1),
});
