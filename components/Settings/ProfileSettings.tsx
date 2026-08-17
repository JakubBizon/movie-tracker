import { AvatarColorPicker } from "@/components/Settings/AvatarColorPicker";
import UsernameInput from "@/components/Settings/UsernameInput";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAvatarColor } from "@/lib/utils/getAvatarColor";

type Props = {
  userName: string;
  email?: string;
  avatarColor: string;
};

export default function ProfileSettings({
  userName,
  email,
  avatarColor,
}: Props) {
  const userNameFirstLetter = userName.slice(0, 1);
  const bgColor = getAvatarColor(avatarColor);
  return (
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
              <p className="text-muted-foreground">{email}</p>
            </div>
          </div>

          <UsernameInput userName={userName} />
        </div>
        <div>
          <AvatarColorPicker defaultColor={avatarColor} />
        </div>
      </CardContent>
    </Card>
  );
}
