"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Maximize, Maximize2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Camera } from "@/lib/types/camera";
import { useFetch } from "@/lib/hooks";
import { SimpleTable } from "@/components/table/simple-table";
import { sampleCameraData } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function SimpleCameraTable() {
  const { data, loading, error, fetchData } =
    useFetch<Camera[]>(`/camera/view/all`);
  //   const [cameras, setCameras] = useState<Camera[]>(data ?? []);
    const [cameras, setCameras] = useState<Camera[]>(sampleCameraData);

  useEffect(() => {
    console.log("cameras", cameras);
  }, [cameras]);
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
  ];
  //   useEffect(() => {
  //     console.log("calling");

  //     fetchData();
  //   }, [fetchData]);
  //   useEffect(() => {
  //     setCameras(data);
  //   }, [data]);

  return (
    <div className="border rounded">
      <div className="border-b flex justify-between p-4">
        <div>
          <p className="text-xl font-bold">Cameras</p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quaerat
            unde maxime laudantium dolorem soluta totam itaque deserunt harum
            vitae.
          </p>
        </div>
        <Link className="p-2 w-fit h-fit hover:bg-accent border rounded" href={"/dashboard/cameras"}>
          <Maximize2 size={16} />
        </Link>
      </div>

      {loading ? (
        <p className="flex gap-2 justify-center items-center flex-1 w-full h-full">
          <Loader2 size={16} className="animate-spin" />
          Loading...
        </p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <SimpleTable columns={columns} dataValues={cameras} />
      )}
    </div>
  );
}
