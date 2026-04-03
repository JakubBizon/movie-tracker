import SignInForm from "@/components/auth/SignInForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="max-w-7xl mx-auto py-10 flex justify-center">
      <SignInForm />
    </div>
  );
}
