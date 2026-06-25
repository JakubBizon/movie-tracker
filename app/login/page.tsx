import SignInForm from "@/components/auth/SignInForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log in",
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <SignInForm />
    </div>
  );
}
