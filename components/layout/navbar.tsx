import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="w-screen h-fit p-4 flex justify-between items-center border-b">
      <p className="text-xl font-bold">AI</p>
      <Link href={"/"}>
        <Button variant={"outline"}>Logout</Button>
      </Link>
    </nav>
  );
}
