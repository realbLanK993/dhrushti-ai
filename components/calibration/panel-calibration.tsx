import { PanelCalibrations } from "@/lib/types/calibration";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { DataTable } from "../table";
import { formatDateTime } from "@/lib/utils";

export default function PanelCalibrationsTab({
  data,
  loading,
  error,
}: {
  data: PanelCalibrations[];
  loading: boolean;
  error: Error | null;
}) {
  const columns: ColumnDef<PanelCalibrations>[] = [
    {
      accessorKey: "uid",
      header: "ID",
    },
    {
      accessorKey: "createdTimestamp",
      header: "Created",
      cell: ({ row }) => {
        return formatDateTime(row.original.createdTimestamp);
      },
    },
    {
      accessorKey: "camCalibUID",
      header: "Camera Calib UID",
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        const calib = row.original;
        return calib.isActive ? "Yes" : "No";
      },
    },
  ];
  return loading ? (
    <p className="flex gap-2 justify-center items-center flex-1 w-full h-full">
      <Loader2 size={16} className="animate-spin" />
      Loading...
    </p>
  ) : (
    <DataTable columns={columns} dataValues={data} />
  );
}
