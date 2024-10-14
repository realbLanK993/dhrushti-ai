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
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import {
  EditEyeTrackerForm,
  EyeTrackerForm,
} from "@/components/form/eye-tracker/form";
import {
  AddEyeTrackerProfileProps,
  EditEyeTrackerProfileProps,
  EyeTrackerProfile,
} from "@/lib/types/eye-tracker";
import { useState } from "react";

const data: EyeTrackerProfile[] = [
  {
    id: "profile_1",
    created: new Date("2023-10-05T12:30:00"),
    active: true,
    description: "Desc 1",
  },
  {
    id: "profile_2",
    created: new Date("2024-02-14T09:45:00"),
    active: false,
    description: "Desc 2",
  },
  {
    id: "profile_3",
    created: new Date("2024-04-20T16:00:00"),
    active: true,
    description: "Desc 3",
  },
];

export default function EyeTracker() {
  const [open, setOpen] = useState(false);
  const [eyeTrackerProfiles, setEyeTrackerProfiles] =
    useState<EyeTrackerProfile[]>(data);
  const columns: ColumnDef<EyeTrackerProfile>[] = [
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
        const eyeTracker = row.original;
        return eyeTracker.active ? "Yes" : "No";
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const eyeTracker = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
                Edit <Pencil size={12} />
              </span>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader>
                <DialogTitle>Edit Eye Tracker {eyeTracker.id}</DialogTitle>
              </DialogHeader>
              <EditEyeTrackerForm
                editEyeTrackerProfile={editEyeTrackerProfile}
                eyeTracker={eyeTracker}
              />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  const addEyeTrackerProfile: (props: AddEyeTrackerProfileProps) => void = ({
    description,
  }) => {
    const newEyeTrackerProfile: EyeTrackerProfile = {
      id: `profile_${eyeTrackerProfiles.length + 1}`,
      created: new Date(),
      active: true,
      description: description ?? "",
    };
    setEyeTrackerProfiles([...eyeTrackerProfiles, newEyeTrackerProfile]);
    setOpen(false);
  };

  const editEyeTrackerProfile: (props: EditEyeTrackerProfileProps) => void = (
    eyeTracker
  ) => {
    const index = eyeTrackerProfiles.findIndex(
      (eyeTrackerProfile) => eyeTrackerProfile.id === eyeTracker.id
    );
    if (index == -1) {
      alert("No such Eye Tracker Profile exists");
    }
    eyeTrackerProfiles[index].description = eyeTracker.description;
    eyeTrackerProfiles[index].active = eyeTracker.active;
    setEyeTrackerProfiles([...eyeTrackerProfiles]);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Eye Tracker Profiles</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Profile</Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add Eye Tracker Profile</DialogTitle>
            </DialogHeader>
            <EyeTrackerForm addEyeTrackerProfile={addEyeTrackerProfile} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={eyeTrackerProfiles} />
      </CardContent>
    </Card>
  );
}
