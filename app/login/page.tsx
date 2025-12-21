import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 flex justify-center">
      <Card className="w-[400px] ">
        <CardTitle className="text-2xl text-center">
          Log in to MovieTracker
        </CardTitle>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pass">Password</Label>
            <Input id="pass" type="password" />
          </div>

          <div className="flex justify-center">
            <Button className="w-full">Log in</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
