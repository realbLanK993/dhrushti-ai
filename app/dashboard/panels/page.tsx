"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/column-header";
import { PanelForm } from "@/components/form/panels/form";
import { useEffect, useState } from "react";
import { EditPanelProps, Panel } from "@/lib/types/panel";
import { useFetch } from "@/lib/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";


const EditPanelForm = ({panel, setPanels}:{panel: Panel; setPanels: React.Dispatch<React.SetStateAction<Panel[]>>}) => {
  const [data, setData] = useState({ ...panel });
  const {fetchData} = useFetch(`/panel/update`);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setData({...panel})
  },[panel])
  const editPanel: (props: EditPanelProps) => void = ({ uid, description }) => {
    fetchData({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, description }),
    }).then(() => {
      setPanels((prev) => {
        const index = prev.findIndex((panel) => panel.uid === uid);
        if (index == -1) {
          alert("No such panel exists");
        }
        prev[index].description = description ?? "";
        return [...prev];
      });
      setOpen(false);
    })
    
    
    
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
          Edit <Pencil size={12} />
        </span>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Update panel {panel.uid}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description ?? ""}
              id="description"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setData({ ...data, description: "" })}
              variant={"outline"}
            >
              Clear
            </Button>
            <Button
              onClick={() =>
                editPanel({ uid: panel.uid, description: data.description })
              }
              type="submit"
            >
              Update
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default function Panels() {
  const columns: ColumnDef<Panel>[] = [
    {
      accessorKey: "uid",
      header: "ID"
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
      accessorKey: "units",
      header: "Units",
    },
    {
      accessorKey: "heightScaling",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Height Scaling" />
      ),
    },
    {
      accessorKey: "widthScaling",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Width Scaling" />
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
            <EditPanelForm panel={panel} setPanels={setPanels} />
          </div>
        );
      },
    },
  ];
  const {data, loading, error, fetchData} = useFetch<Panel[]>(`/panel/view/all`);
  const [panels, setPanels] = useState(data ?? []);
  useEffect(() => {
    fetchData();
  }, [fetchData])
  useEffect(() => {
    setPanels(data);
  }, [data])
  
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Panels</p>
        <PanelForm setPanels={setPanels} />
      </CardHeader>
      <CardContent>
        {
          loading ? (
            <p>Loading...</p>
          ) :
          error ? (
            <p>{error.message}</p>
          ) : (
            <DataTable columns={columns} dataValues={panels} />
          )
        }
      </CardContent>
    </Card>
  );
}
