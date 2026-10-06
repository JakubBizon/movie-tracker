"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import z from "zod";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSignIn = async (values: SignInValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => setIsLoading(true),
        onResponse: () => setIsLoading(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Successfully logged in!");
          router.push("/");
          router.refresh();
        },
      },
    );
  };
  const onSignUpGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/?login=success",
      },

      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const onSignUpGithub = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/?login=success",
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Card className="min-w-100">
      <CardTitle className="text-2xl text-center">
        Log in to MovieTracker
      </CardTitle>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              name="email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              id="password"
              name="password"
              type="password"
            />
          </div>
          <div className="flex gap-2 justify-center">
            <div>New here?</div>
            <Link className="text-primary" href="/signup">
              Sign up
            </Link>
          </div>
          <div className="flex justify-center">
            <Button className="px-10" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in" : "Log in"}
            </Button>
          </div>
        </form>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex-1 h-px bg-border" />
          <span>or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center text-sm">
          <button
            type="button"
            onClick={onSignUpGithub}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#24292f] bg-[#24292f] px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1f2328]"
          >
            <FaGithub size={18} />
            GitHub
          </button>
          <button
            type="button"
            onClick={onSignUpGoogle}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#dadce0] bg-[#ffffff] px-4 text-sm font-medium text-[#3c4043] shadow-sm transition-colors hover:bg-[#f8f9fa]"
          >
            <FaGoogle size={18} />
            Google
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
