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
import { Pencil } from "lucide-react";
import {
  EditEyeTrackerExperimentsForm,
  EyeTrackerExperimentsForm,
} from "@/components/form/eye-tracker-experiments/form";
import {
  AddEyeTrackerExperimentsProps,
  EditEyeTrackerExperimentsProps,
  EyeTrackerExperiment,
} from "@/lib/types/eye-tracker-experiments";
import { useState } from "react";

const data: EyeTrackerExperiment[] = [
  {
    id: "experiment_1",
    eyeTrackerProfileId: "profile_1",
    created: new Date("2023-12-18T14:10:00"),
    description: "Desc 1",
  },
  {
    id: "experiment_2",
    eyeTrackerProfileId: "profile_2",
    created: new Date("2024-02-25T09:25:00"),
    description: "Desc 2",
  },
  {
    id: "experiment_3",
    eyeTrackerProfileId: "profile_3",
    created: new Date("2024-05-10T12:40:00"),
    description: "Desc 3",
  },
];

export default function EyeTrackerExperiments() {
  const [eyeTrackerExperiments, setEyeTrackerExperiments] = useState(data);
  const [open, setOpen] = useState(false);

  const addEyeTrackerExperiment: (
    props: AddEyeTrackerExperimentsProps
  ) => void = ({ description }) => {
    setEyeTrackerExperiments([
      ...eyeTrackerExperiments,
      {
        id: `experiment_${eyeTrackerExperiments.length + 1}`,
        eyeTrackerProfileId: `profile_${eyeTrackerExperiments.length + 1}`,
        created: new Date(),
        description: description ?? "",
      },
    ]);
    setOpen(false);
  };

  const editEyeTrackerExperiment: (
    props: EditEyeTrackerExperimentsProps
  ) => void = ({ id, description }) => {
    const index = eyeTrackerExperiments.findIndex(
      (experiment) => experiment.id === id
    );
    if (index == -1) {
      alert("No such experiment exists");
    }
    const updatedEyeTrackerExperiments = [...eyeTrackerExperiments];
    updatedEyeTrackerExperiments[index].description = description ?? "";
    setEyeTrackerExperiments(updatedEyeTrackerExperiments);
    setOpen(false);
  };

  const columns: ColumnDef<EyeTrackerExperiment>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "eyeTrackerProfileId",
      header: "Profile ID",
    },
    {
      accessorKey: "created",
      header: "Created",
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const experiment = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
                Edit <Pencil size={12} />
              </span>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader>
                <DialogTitle>Edit Experiment {experiment.id}</DialogTitle>
              </DialogHeader>
              <EditEyeTrackerExperimentsForm
                editEyeTrackerExperiment={editEyeTrackerExperiment}
                experiment={experiment}
              />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Eye Tracker Experiments</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Start New</Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Start New Experiment</DialogTitle>
            </DialogHeader>
            <EyeTrackerExperimentsForm
              addEyeTrackerExperiment={addEyeTrackerExperiment}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={eyeTrackerExperiments} />
      </CardContent>
    </Card>
  );
}
