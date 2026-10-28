"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DialogType = "interaction" | "rate" | "review";

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type: DialogType;
};

const dialogContent: Record<
  DialogType,
  { title: string; description: string }
> = {
  interaction: {
    title: "Log in to continue",
    description:
      "You need to be logged in to add movies to your favorites or bookmarks.",
  },
  rate: {
    title: "Log in to rate this movie",
    description: "You need to be logged in to rate movies.",
  },
  review: {
    title: "Log in to add reviews",
    description: "You need to be logged in to review movies",
  },
};

export default function AuthDialog({ open, onOpenChange, type }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const content = dialogContent[type];

  const getCallbackUrl = () => {
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;
    return encodeURIComponent(fullPath);
  };

  const handleLogIn = () => {
    onOpenChange(false);
    router.push(`/login?callbackUrl=${getCallbackUrl()}`);
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push(`/signup?callbackUrl=${getCallbackUrl()}`);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <DialogHeader className="flex items-center text-center">
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-2">
          <Button onClick={handleLogIn} className="cursor-pointer">
            Log in
          </Button>
          <Button
            onClick={handleSignUp}
            variant="outline"
            className="cursor-pointer"
          >
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
