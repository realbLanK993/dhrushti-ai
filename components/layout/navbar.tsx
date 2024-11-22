import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className=" w-full p-4 h-fit flex justify-between items-center border-b">
      <p className="text-xl font-bold">Dhrusthi AI</p>
      <Link href={"/"}>
        <Button variant={"outline"}>Logout</Button>
      </Link>
    </nav>
  );
}
