"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { EditUserForm, UserForm } from "@/components/form/users/form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { AddUserProps, EditUserProps, User } from "@/lib/types/user";

const data: User[] = [
  {
    id: "user_001",
    created: new Date("2023-11-01T10:20:00"),
    active: true,
    username: "john_doe",
  },
  {
    id: "user_002",
    created: new Date("2024-01-15T15:35:00"),
    active: false,
    username: "jane_smith",
  },
  {
    id: "user_003",
    created: new Date("2024-03-22T11:50:00"),
    active: true,
    username: "mark_jones",
  },
];

export default function Users() {
  const [users, setUsers] = useState(data);
  const [open, setOpen] = useState(false);

  const addUsers: (props: AddUserProps) => void = ({ username }) => {
    setUsers([
      ...users,
      {
        id: `user_${users.length + 1}`,
        created: new Date(),
        active: true,
        username: username ?? "",
      },
    ]);
    setOpen(false);
  };

  const editUser: (props: EditUserProps) => void = ({
    id,
    username,
    active,
  }) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            username: username,
            active: active,
          };
        }
        return user;
      })
    );
    setOpen(false);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "created",
      header: "Created",
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => {
        const user = row.original;
        return user.active ? "Yes" : "No";
      },
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
                Edit <Pencil size={12} />
              </span>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader>
                <DialogTitle>Edit User {user.id}</DialogTitle>
              </DialogHeader>
              <EditUserForm editUser={editUser} user={user} />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Users</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
            </DialogHeader>
            <UserForm addUser={addUsers} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={users} />
      </CardContent>
    </Card>
  );
}
