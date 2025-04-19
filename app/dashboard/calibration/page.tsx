"use client";

import CalibrationModal from "@/components/calibration-modal";
import CameraCalibration from "@/components/camera-calibration";
import { Button } from "@/components/ui/button";
import UserCalibration from "@/components/user-calibration/user-calibration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetch } from "@/lib/hooks";
import { CameraCalibrations, PanelCalibrations } from "@/lib/types/calibration";
import { useEffect } from "react";
import PanelCalibrationsTab from "@/components/calibration/panel-calibration";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";

type CameraCalibrationType = {
  uid: number;
  createdTimestamp: string;
  refCamUID: number;
  isActive: boolean;
  description?: string;
};

export default function Calibrations() {
  const allCameraCalibration = useFetch<CameraCalibrationType[]>(
    "/camera/calibration/view/all"
  );
  const panelCalibrations = useFetch<PanelCalibrations[]>(
    "/panel/calibration/view/all"
  );
  useEffect(() => {
    allCameraCalibration.fetchData();
    panelCalibrations.fetchData();
  }, []);

  const columns: ColumnDef<CameraCalibrationType>[] = [
    {
      accessorKey: "uid",
      header: "UID",
    },
    {
      accessorKey: "createdTimestamp",
      header: "Created",
      cell: ({ row }) => {
        return formatDateTime(row.original.createdTimestamp);
      },
    },
    {
      accessorKey: "refCamUID",
      header: "Reference Cam ID",
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        return row.original.isActive ? "Yes" : "No";
      },
    },
  ];

  return (
    <div className="pt-20 p-4 flex flex-col gap-32">
      <Tabs defaultValue="panel">
        <TabsList>
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="panel">Panel</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Card>
            <CardHeader className="flex flex-row gap-4 justify-between">
              <span className="font-bold">User Calibration</span>
              <UserCalibration />
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="panel">
          <CalibrationModal panelCalibData={panelCalibrations.data} />
          <Card>
            <CardHeader className="font-bold flex flex-row justify-between">
              <span>All Panel Calibrations </span>
              <Button>Add Panel Calib</Button>
            </CardHeader>
            <CardContent>
              <PanelCalibrationsTab
                data={panelCalibrations.data}
                loading={panelCalibrations.loading}
                error={panelCalibrations.error}
              />
            </CardContent>
            <CardFooter />
          </Card>
        </TabsContent>
        <TabsContent value="camera">
          <Card>
            <CardHeader className="flex flex-row gap-4 justify-between">
              <span className="font-bold">Camera Calibration</span>
              <CameraCalibration />
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                dataValues={allCameraCalibration.data}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
