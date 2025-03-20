"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { EditUserForm, UserForm } from "@/components/form/users/form";
import { useEffect, useState } from "react";
import {  User } from "@/lib/types/user";
import { useFetch } from "@/lib/hooks";
import { Loader2 } from "lucide-react";


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
    <div className="px-8 py-24">
      <Card>
        <CardHeader className="flex flex-row justify-between gap-2">
          <p className="font-bold">All Users</p>
          <UserForm setUsers={setUsers} />
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="flex gap-2 justify-center items-center flex-1 w-full h-full">
              <Loader2 size={16} className="animate-spin" />
              Loading...
            </p>
          ) : error ? (
            <p>{`Error Fetching Resources: ${error.message}`}</p>
          ) : !error && (
            <DataTable dataValues={users} columns={columns} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
