import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { AddUserProps, EditUserProps, User } from "@/lib/types/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useFetch } from "@/lib/hooks";
export const UserForm = ({
  setUsers,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  const [username, setUsername] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { fetchData, error, loading } = useFetch<User>("/user/add");
  const addUsers: (props: AddUserProps) => void = async (props) => {
    await fetchData({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });
    if (!error) {
      setUsers((prev) => [
        {
          uid: `${prev.length + 1}`,
          createdTimestamp: new Date(),
          isActive: true,
          username: username ?? "",
        },
        ...prev,
      ]);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username (optional)</Label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="username"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => addUsers({ username })} type="submit">
              Add
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const EditUserForm = ({
  user,
  setUsers,
}: {
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  const [u, setData] = useState<User>({ ...user });
  const editUser: (props: EditUserProps) => void = ({
    uid,
    username,
    isActive,
  }) => {
    setUsers((prev) => {
      const index = prev.findIndex((user) => user.uid === uid);
      if (index == -1) {
        alert("No such User exists");
      }
      prev[index].username = username ?? "";
      prev[index].isActive = isActive;
      return [...prev];
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="">
        <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
          Edit <Pencil size={12} />
        </span>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit User {user.uid}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-2">
            <Checkbox
              checked={!u.isActive}
              onCheckedChange={(e: boolean) => setData({ ...u, isActive: !e })}
              id="disable"
            />
            <Label htmlFor="disable">Disable</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username (optional)</Label>
            <Input
              onChange={(e) => setData({ ...u, username: e.target.value })}
              value={u.username ?? ""}
              id="username"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setData({ ...user, username: "" })}
              variant={"outline"}
            >
              Clear
            </Button>
            <Button onClick={() => editUser({ ...u })} type="submit">
              Update
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
