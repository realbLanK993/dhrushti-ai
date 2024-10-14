import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { AddUserProps, EditUserProps, User } from "@/lib/types/user";

export const UserForm = ({
  addUser,
}: {
  addUser: (props: AddUserProps) => void;
}) => {
  const [username, setUsername] = useState<string>("");
  return (
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
        <Button onClick={() => addUser({ username })} type="submit">
          Add
        </Button>
      </DialogFooter>
    </div>
  );
};

export const EditUserForm = ({
  user,
  editUser,
}: {
  user: User;
  editUser: (props: EditUserProps) => void;
}) => {
  const [data, setData] = useState({ ...user });
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-2">
        <Checkbox
          checked={!data.active}
          onCheckedChange={(e: boolean) => setData({ ...data, active: !e })}
          id="disable"
        />
        <Label htmlFor="disable">Disable</Label>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username (optional)</Label>
        <Input
          onChange={(e) => setData({ ...data, username: e.target.value })}
          value={data.username ?? ""}
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
        <Button onClick={() => editUser({ ...data })} type="submit">
          Update
        </Button>
      </DialogFooter>
    </div>
  );
};
