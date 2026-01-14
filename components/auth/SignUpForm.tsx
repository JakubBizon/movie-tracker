"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password != confirmPassword) {
      toast.error("Password don't match");
      return;
    }

    await authClient.signUp.email(
      {
        email,
        password,
        name: email.split("@")[0],
        callbackURL: "/",
      },
      {
        onRequest: () => setIsLoading(true),
        onResponse: () => setIsLoading(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };
  return (
    <Card className="w-[400px]">
      <CardTitle className="text-2xl text-center">
        Welcome to MovieTracker!
      </CardTitle>
      <CardContent className="space-y-4">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Password Confirm</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Signing up" : "Sign up"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
