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
            <Button className="px-8" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in" : "Log in"}
            </Button>
          </div>
        </form>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex-1 h-px bg-gray-200" />
          <span>or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center text-sm">
          <button
            onClick={onSignUpGithub}
            className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#24292e] hover:bg-[#3a3f44] text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
          >
            <FaGithub size={18} />
            GitHub
          </button>
          <button
            onClick={onSignUpGoogle}
            className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#24292e] hover:bg-[#3a3f44] text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
          >
            <FaGoogle size={18} />
            Google
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
