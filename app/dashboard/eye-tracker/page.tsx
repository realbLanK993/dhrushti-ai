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
import { Loader2 } from "lucide-react";


export default function EyeTracker() {
  const [eyeTrackerProfiles, setEyeTrackerProfiles] =
    useState<EyeTrackerProfile[]>([]);
    const {data,fetchData, error, loading} = useFetch<EyeTrackerProfile[]>(`/et/profile/view/all`);
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
    <div className="px-8 py-24">
      <Card>
        <CardHeader className="flex flex-row justify-between gap-2">
          <p className="font-bold">All Eye Tracker Profiles</p>
          <EyeTrackerForm
            eyeTrackerProfiles={eyeTrackerProfiles}
            setEyeTrackerProfiles={setEyeTrackerProfiles}
          />
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="flex gap-2 justify-center items-center flex-1 w-full h-full">
              <Loader2 size={16} className="animate-spin" />
              Loading...
            </p>
          ) : error ? (
            <p>{`Error Fetching Resources: ${error.message}`}</p>
          ) : (
            !error && (
              <DataTable columns={columns} dataValues={eyeTrackerProfiles} />
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
