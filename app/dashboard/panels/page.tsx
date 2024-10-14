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
import { DataTableColumnHeader } from "@/components/table/column-header";
import { EditPanelForm, PanelForm } from "@/components/form/panels/form";
import { useState } from "react";
import { AddPanelProps, EditPanelProps, Panel } from "@/lib/types/panel";

const data: Panel[] = [
  {
    id: "1",
    width: 500,
    height: 300,
    reportingUnits: "mm",
    description: "Desc 1",
  },
  {
    id: "2",
    width: 800,
    height: 600,
    reportingUnits: "pixels",
    horizontalResolution: 2560,
    verticalResolution: 1440,
    description: "Desc 2",
  },
  {
    id: "3",
    width: 700,
    height: 500,
    reportingUnits: "mm",
    description: "Desc 3",
  },
];

export default function Panels() {
  const columns: ColumnDef<Panel>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "width",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Width" />
      ),
    },
    {
      accessorKey: "height",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Height" />
      ),
    },
    {
      accessorKey: "reportingUnits",
      header: "Reporting Units",
    },
    {
      accessorKey: "horizontalResolution",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Horizontal Resolution" />
      ),
    },
    {
      accessorKey: "verticalResolution",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vertical Resolution" />
      ),
    },
    {
      accessorKey: "action",
      header: "Edit",
      cell: ({ row }) => {
        const panel = row.original;
        return (
          <div className="text-right">
            <span className="sr-only">Edit</span>

            <Dialog>
              <DialogTrigger asChild>
                <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
                  Edit <Pencil size={12} />
                </span>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Update panel {panel.id}</DialogTitle>
                </DialogHeader>
                <EditPanelForm editPanel={editPanel} panel={panel} />
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];
  const [panels, setPanels] = useState(data);
  const [open, setOpen] = useState(false);
  const addPanel: (props: AddPanelProps) => void = ({
    width,
    height,
    reportingUnits,
    horizontalResolution,
    verticalResolution,
    description,
  }) => {
    setPanels([
      ...panels,
      {
        id: `${panels.length + 1}`,
        width,
        height,
        reportingUnits,
        horizontalResolution,
        verticalResolution,
        description: description ?? "",
      },
    ]);
    setOpen(false);
  };
  const editPanel: (props: EditPanelProps) => void = ({ id, description }) => {
    const index = panels.findIndex((panel) => panel.id === id);
    if (index == -1) {
      alert("No such panel exists");
    }
    panels[index].description = description ?? "";
    setPanels([...panels]);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Panels</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Panel</Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add Panel</DialogTitle>
            </DialogHeader>
            <PanelForm addPanel={addPanel} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={panels} />
      </CardContent>
    </Card>
  );
}
