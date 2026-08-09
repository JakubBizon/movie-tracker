import * as z from "zod/mini";

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
