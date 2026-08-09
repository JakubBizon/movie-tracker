import { AvatarColorPicker } from "@/components/Settings/AvatarColorPicker";
import UsernameInput from "@/components/Settings/UsernameInput";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { auth } from "@/lib/auth";
import { getAvatarColor } from "@/lib/utils/getAvatarColor";
import { SettingsIcon } from "lucide-react";
import { headers } from "next/headers";

export default async function Settings() {
  const session = await auth.api.getSession({ headers: await headers() });

  const userName = session?.user.name ?? "User";
  const userNameFirstLetter = userName.slice(0, 1);
  const bgColor = getAvatarColor(session?.user.avatarColor ?? "blue");

  return (
    <div className="max-w-5xl w-full mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center gap-2 mb-10">
        <SettingsIcon className="w-10 h-10 text-primary" />
        <span className="text-4xl items-center flex">Settings</span>
      </div>
      <Card>
        <CardHeader>
          <span className="text-lg font-semibold">Profile</span>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 xs:px-6 px-4">
          <div className="flex md:flex-row flex-col md:items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <Avatar className="sm:h-16 sm:w-16 w-12 h-12">
                <AvatarFallback
                  className={`${bgColor} sm:text-2xl text-lg font-bold text-primary-foreground`}
                >
                  {userNameFirstLetter?.toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{userName}</p>
                <p className="text-muted-foreground">{session?.user.email}</p>
              </div>
            </div>

            <UsernameInput userName={userName} />
          </div>
          <div>
            <AvatarColorPicker defaultColor={session?.user.avatarColor} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
