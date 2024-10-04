import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 justify-center w-screen h-screen items-center">
      <Card className="min-w-[300px] max-w-[600px] w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login with your credentials</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="w-full flex-col gap-2 justify-center items-center">
          <Link className="w-full" href={"dashboard"}>
            <Button className="w-full">Login</Button>
          </Link>
          <p className="italic">
            New user? Register{" "}
            <Button disabled className="px-0 text-base italic" variant={"link"}>
              Here
            </Button>{" "}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
