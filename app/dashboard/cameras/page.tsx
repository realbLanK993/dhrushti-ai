"use client";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CameraForm } from "@/components/form/camera/form";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Camera, CameraConfigType, EditCameraProps } from "@/lib/types/camera";
import { useFetch } from "@/lib/hooks";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddCameraConfigForm } from "@/components/form/camera/add-config";

const EditCameraForm = ({
  camera,
  setCameras,
}: {
  camera: Camera;
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>;
}) => {
  const { response, fetchData } = useFetch(`/camera/update`);
  const [data, setData] = useState({ ...camera });
  const [open, setOpen] = useState(false);
  const editCamera = (body: EditCameraProps) => {
    return fetchData({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        console.log(response, "check");
        setCameras((prev) => {
          const index = prev.findIndex((c) => {
            return c.uid === camera.uid;
          });

          if (index == -1) {
            alert("No such camera exists");
          }
          prev[index].description = data.description ?? "";
          return [...prev];
        });
      })
      .catch((err) => {
        console.log("Error: \n", err);
      })
      .finally(() => setOpen(false));
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
          <DialogTitle>Edit Camera {camera.uid}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <Label className="font-bold" htmlFor="description">
              Description
            </Label>
            <Textarea
              value={data.description ?? ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
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
                editCamera({
                  cameraUID: data.uid,
                  isActive: data.isActive,
                  description: data.description ?? "",
                })
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

const CameraConfig = ({
  cameraUID,
  cameraConfig,
  loading,
  error,
}: {
  cameraUID: string;
  cameraConfig: CameraConfigType;
  loading: boolean;
  error: Error | null;
}) => {
  useEffect(() => {
    console.log("comp data", cameraConfig);
  }, [cameraConfig]);
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Camera config {cameraUID}</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="p-4">
            {cameraConfig ? (
              <ScrollArea className=" max-h-[300px] h-full">
                <div className="w-fit flex flex-col gap-4">
                  {Object.keys(cameraConfig).map((key, value) => {
                    return (
                      <div className="flex gap-2">
                        <p>
                          {" "}
                          <span className="font-bold">{key}</span>{" "}
                          {/* @ts-expect-error ill fix this later */}
                          {` : ${cameraConfig[key]}`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            ) : (
              <p>No config data</p>
            )}
          </div>
        )}
        {error && <div>{`Failed to fetch : ${error.message}`}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default function Cameras() {
  const { data, loading, error, fetchData } =
    useFetch<Camera[]>(`/camera/view/all`);
  const [cameras, setCameras] = useState<Camera[]>(data ?? []);
  const cameraConfig = useFetch<CameraConfigType[]>(
    "/camera/configuration/view/all"
  );
  const [configs, setConfigs] = useState<CameraConfigType[]>(
    cameraConfig.data ?? []
  );

  useEffect(() => {
    cameraConfig.fetchData();
  }, []);
  useEffect(() => {
    setConfigs(cameraConfig.data);
  }, [cameraConfig.data]);
  const columns: ColumnDef<Camera>[] = [
    {
      accessorKey: "uid",
      header: "ID",
    },
    {
      accessorKey: "createdTimestamp",
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
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        const camera = row.original;
        return camera.isActive ? "Yes" : "No";
      },
    },
    {
      accessorKey: "action",
      header: "Edit",
      cell: ({ row }) => {
        const camera = row.original;
        return (
          <div>
            <EditCameraForm setCameras={setCameras} camera={camera} />
          </div>
        );
      },
    },
    {
      accessorKey: "config",
      header: "Config",
      cell: ({ row }) => {
        const camera = row.original;
        return (
          <CameraConfig
            cameraConfig={configs.filter((e) => e.cameraUID == camera.uid)[0]}
            loading={cameraConfig.loading}
            error={cameraConfig.error}
            cameraUID={camera.uid}
          />
        );
      },
    },
  ];
  useEffect(() => {
    console.log("calling");

    fetchData();
  }, [fetchData]);
  useEffect(() => {
    setCameras(data);
  }, [data]);

  return (
    <div className="py-24 px-8">
      <Card>
        <CardHeader className="flex flex-row justify-between gap-2">
          <p className="font-bold">All Cameras</p>
          <div className="flex gap-2">
            <AddCameraConfigForm cameras={cameras} setConfigs={setConfigs} />
            <CameraForm setData={setCameras} />
          </div>
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
            <DataTable columns={columns} dataValues={cameras} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
