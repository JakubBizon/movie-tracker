import { AvatarColorPicker } from "@/components/Settings/AvatarColorPicker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { SettingsIcon } from "lucide-react";
import { headers } from "next/headers";

export default async function Settings() {
  const session = await auth.api.getSession({ headers: await headers() });

  const userName = session?.user.name ?? "User";
  const userNameFirstLetter = userName.slice(0, 1);

  return (
    <div className="max-w-7xl w-full mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center gap-2 mb-10">
        <SettingsIcon className="w-10 h-10 text-primary" />
        <span className="text-4xl items-center flex">Settings</span>
      </div>
      <div className="max-w-5xl w-full mx-auto">
        <Card>
          <CardHeader>
            <span className="text-lg font-semibold">Profile</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {userNameFirstLetter?.toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{userName}</p>
                  <p className="text-muted-foreground">{session?.user.email}</p>
                </div>
              </div>
              <div className="flex w-1/2 items-center gap-4">
                <div className="flex flex-col gap-1 w-full justify-center">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      placeholder="Enter a username"
                      defaultValue={userName}
                    />
                    <Button type="submit" className="ml-auto">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p>Avatar Color</p>

              <AvatarColorPicker />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
