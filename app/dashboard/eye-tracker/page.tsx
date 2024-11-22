"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import {
  EditEyeTrackerForm,
  EyeTrackerForm,
} from "@/components/form/eye-tracker/form";
import {
  EyeTrackerProfile,
} from "@/lib/types/eye-tracker";
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/hooks";


export default function EyeTracker() {
  const [eyeTrackerProfiles, setEyeTrackerProfiles] =
    useState<EyeTrackerProfile[]>([]);
    const {data,fetchData} = useFetch<EyeTrackerProfile[]>(`/et/profile/view/all`);
    useEffect(() => {
      fetchData();
    }, [fetchData]);
    useEffect(() =>{
      setEyeTrackerProfiles(data ?? []);
    },[data])
  const columns: ColumnDef<EyeTrackerProfile>[] = [
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
        const eyeTracker = row.original;
        return eyeTracker.isActive ? "Yes" : "No";
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const eyeTracker = row.original;
        return (
          <EditEyeTrackerForm
                setEyeTrackerProfiles={setEyeTrackerProfiles}
                eyeTracker={eyeTracker}
              />
          
        );
      },
    },
  ];


  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Eye Tracker Profiles</p>
        <EyeTrackerForm eyeTrackerProfiles={eyeTrackerProfiles} setEyeTrackerProfiles={setEyeTrackerProfiles} />
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} dataValues={eyeTrackerProfiles} />
      </CardContent>
    </Card>
  );
}
