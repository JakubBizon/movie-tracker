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
    })
  );

export const signInSchema = z.object({
  email: z.email("Invalid email adress"),
  password: z.string().check(z.minLength(1, "Password is required")),
});
