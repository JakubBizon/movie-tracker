"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export default function AuthDialog({ open, onOpenChange }: Props) {
  const router = useRouter();

  const handleLogIn = () => {
    onOpenChange(false);
    router.push("/login");
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push("/signup");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <DialogHeader className="flex items-center">
          <DialogTitle>Log in to rate this movie</DialogTitle>
          <DialogDescription>
            You need to be logged in to perform this action.
          </DialogDescription>
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
