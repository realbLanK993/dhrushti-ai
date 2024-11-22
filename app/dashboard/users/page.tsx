"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { EditUserForm, UserForm } from "@/components/form/users/form";
import { useEffect, useState } from "react";
import {  User } from "@/lib/types/user";
import { useFetch } from "@/lib/hooks";


export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const {fetchData, loading, error,data} = useFetch<User[]>(`/user/view/all`);

  useEffect(() => {
    fetchData();
  },[fetchData])
  useEffect(() => {
    setUsers(data)
  },[data])



  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "uid",
      header: "ID",
    },
    {
      accessorKey: "createdTimestamp",
      header: "Created",
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        const user = row.original;
        return user.isActive ? "Yes" : "No";
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
          <EditUserForm setUsers={setUsers} user={user} />
          
        );
      },
    },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Users</p>
        <UserForm setUsers={setUsers} />
      </CardHeader>
      <CardContent>
        {
          !loading && !error && <DataTable dataValues={users} columns={columns} />
        }
      </CardContent>
    </Card>
  );
}
