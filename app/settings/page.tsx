import LoggedOutState from "@/components/MyLists/LoggedOutState";
import DataSettings from "@/components/Settings/DataSettings";
import ProfileSettings from "@/components/Settings/ProfileSettings";
import SessionSettings from "@/components/Settings/SessionSettings";
import { auth } from "@/lib/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SettingsIcon } from "lucide-react";
import { headers } from "next/headers";

export default async function Settings() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) {
    return (
      <LoggedOutState
        title="Log in to see settings"
        description="Your profile, data, and sessions will be displayed after logging in"
      />
    );
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["sessions"],
    queryFn: () => auth.api.listSessions({ headers: requestHeaders }),
  });

  return (
    <div className="max-w-5xl w-full mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center gap-2 mb-10">
        <SettingsIcon className="w-10 h-10 text-primary" />
        <span className="text-4xl items-center flex">Settings</span>
      </div>

      <div className="flex flex-col gap-6">
        <ProfileSettings
          userName={session?.user.name ?? "User"}
          email={session?.user.email}
          avatarColor={session?.user.avatarColor ?? "blue"}
        />

        <DataSettings />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <SessionSettings currentSessionId={session.session.id} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
