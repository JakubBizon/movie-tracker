import SignUpForm from "@/components/auth/SignUpForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <SignUpForm />
    </div>
  );
}
