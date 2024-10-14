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
import { CameraForm, EditCameraForm } from "@/components/form/camera/form";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { AddCameraProps, Camera, EditCameraProps } from "@/lib/types/camera";

const data: Camera[] = [
  {
    id: "cam_1",
    created: new Date("2024-01-15T09:30:00"),
    manufacturer: "Canon",
    model: "EOS 90D",
    serialNumber: "SN123456789",
    description: "Desc 1",
  },
  {
    id: "cam_2",
    created: new Date("2023-12-22T14:45:00"),
    manufacturer: "Nikon",
    model: "Z6 II",
    serialNumber: "SN987654321",
    description: "Desc 2",
  },
  {
    id: "cam_3",
    created: new Date("2023-11-10T08:15:00"),
    manufacturer: "Sony",
    model: "Alpha 7R IV",
    serialNumber: "SN2468101214",
    description: "Desc 3",
  },
];

export default function Cameras() {
  const [cameras, setCameras] = useState<Camera[]>(data);
  const [open, setOpen] = useState(false);
  const columns: ColumnDef<Camera>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "created",
      header: "Created",
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "serialNumber",
      header: "Serial Number",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const camera = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
                Edit <Pencil size={12} />
              </span>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader>
                <DialogTitle>Edit Camera {camera.id}</DialogTitle>
              </DialogHeader>
              <EditCameraForm editCamera={editCamera} camera={camera} />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
  const addCamera: (props: AddCameraProps) => void = ({
    manufacturer,
    model,
    serialNumber,
    description,
  }) => {
    const newCamera: Camera = {
      id: `cam_${cameras.length + 1}`,
      created: new Date(),
      manufacturer: manufacturer,
      model: model,
      serialNumber: serialNumber,
      description: description ?? "",
    };
    setCameras([...cameras, newCamera]);
    setOpen(false);
  };
  const editCamera: (props: EditCameraProps) => void = ({
    id,
    description,
  }) => {
    console.log(id);

    const index = cameras.findIndex((camera) => {
      console.log(camera.id, id);
      return camera.id === id;
    });
    if (index == -1) {
      alert("No such camera exists");
    }
    cameras[index].description = description ?? "";
    setCameras([...cameras]);
    setOpen(false);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Cameras</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Camera</Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add Camera</DialogTitle>
            </DialogHeader>
            <CameraForm addCamera={addCamera} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={cameras} />
      </CardContent>
    </Card>
  );
}
