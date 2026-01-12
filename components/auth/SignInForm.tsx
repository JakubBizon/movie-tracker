import { signInAction } from "@/app/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInForm() {
  return (
    <Card className="w-[400px] ">
      <CardTitle className="text-2xl text-center">
        Log in to MovieTracker
      </CardTitle>
      <CardContent className="space-y-4">
        <form action={signInAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="flex justify-center">
            <Button type="submit">Log in</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
