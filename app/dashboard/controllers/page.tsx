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

import { ControllerForm } from "@/components/form/controllers/form";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, ControllerConfigType } from "@/lib/types/controller";
import { useFetch } from "@/lib/hooks";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddControllerConfigForm } from "@/components/form/controllers/add-config";
// import { AddControllerConfigForm } from "@/components/form/controller/add-config";

// const EditControllerForm = ({
//   controller,
//   setControllers,
// }: {
//   controller: Controller;
//   setControllers: React.Dispatch<React.SetStateAction<Controller[]>>;
// }) => {
//   const { response, fetchData } = useFetch(`/controller/update`);
//   const [data, setData] = useState({ ...controller });
//   const [open, setOpen] = useState(false);
//   const editController = (body: EditControllerProps) => {
//     return fetchData({
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     })
//       .then(() => {
//         console.log(response, "check");
//         setControllers((prev) => {
//           const index = prev.findIndex((c) => {
//             return c.uid === controller.uid;
//           });

//           if (index == -1) {
//             alert("No such controller exists");
//           }
//           prev[index].description = data.description ?? "";
//           return [...prev];
//         });
//       })
//       .catch((err) => {
//         console.log("Error: \n", err);
//       })
//       .finally(() => setOpen(false));
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
//           Edit <Pencil size={12} />
//         </span>
//       </DialogTrigger>
//       <DialogContent className="bg-white text-black">
//         <DialogHeader>
//           <DialogTitle>Edit Controller {controller.uid}</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-4 ">
//           <div className="flex flex-col gap-2">
//             <Label className="font-bold" htmlFor="description">
//               Description
//             </Label>
//             <Textarea
//               value={data.description ?? ""}
//               onChange={(e) =>
//                 setData({ ...data, description: e.target.value })
//               }
//               id="description"
//             />
//           </div>
//           <DialogFooter>
//             <Button
//               onClick={() => setData({ ...data, description: "" })}
//               variant={"outline"}
//             >
//               Clear
//             </Button>
//             <Button
//               onClick={() =>
//                 editController({
//                   controllerUID: data.uid,
//                   isActive: data.isActive,
//                   description: data.description ?? "",
//                 })
//               }
//               type="submit"
//             >
//               Update
//             </Button>
//           </DialogFooter>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

const ControllerConfig = ({
  controllerUID,
  controllerConfig,
  loading,
  error,
}: {
  controllerUID: string;
  controllerConfig: ControllerConfigType;
  loading: boolean;
  error: Error | null;
}) => {
  useEffect(() => {
    console.log("comp data", controllerConfig);
  }, [controllerConfig]);
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controller config {controllerUID}</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="p-4">
            {controllerConfig ? (
              <ScrollArea className=" max-h-[300px] h-full">
                <div className="w-fit flex flex-col gap-4">
                  {Object.keys(controllerConfig).map((key, value) => {
                    return (
                      <div className="flex gap-2">
                        <p>
                          {" "}
                          <span className="font-bold">{key}</span>{" "}
                          {/* @ts-expect-error ill fix this later */}
                          {` : ${controllerConfig[key]}`}
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

export default function Controllers() {
  const { data, loading, error, fetchData } =
    useFetch<Controller[]>(`/controller/view/all`);
  const [controllers, setControllers] = useState<Controller[]>(data ?? []);
  const controllerConfig = useFetch<ControllerConfigType[]>(
    "/controller/configuration/view/all"
  );
  const [configs, setConfigs] = useState<ControllerConfigType[]>(
    controllerConfig.data ?? []
  );

  useEffect(() => {
    controllerConfig.fetchData();
  }, []);
  useEffect(() => {
    setConfigs(controllerConfig.data);
  }, [controllerConfig.data]);
  const columns: ColumnDef<Controller>[] = [
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
      accessorKey: "serialNumber",
      header: "Serial Number",
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        const controller = row.original;
        return controller.isActive ? "Yes" : "No";
      },
    },
    {
      accessorKey: "config",
      header: "Config",
      cell: ({ row }) => {
        const controller = row.original;
        return (
          <ControllerConfig
            controllerConfig={
              configs.filter((e) => e.controllerUID == controller.uid)[0]
            }
            loading={controllerConfig.loading}
            error={controllerConfig.error}
            controllerUID={controller.uid}
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
    setControllers(data);
  }, [data]);

  return (
    <div className="py-24 px-8">
      <Card>
        <CardHeader className="flex flex-row justify-between gap-2">
          <p className="font-bold">All Controllers</p>
          <div className="flex gap-2">
            <AddControllerConfigForm
              controllers={controllers}
              setControllers={setConfigs}
            />
            <ControllerForm setControllers={setControllers} />
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
            <DataTable columns={columns} dataValues={controllers} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
