import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CameraForm, EditCameraForm } from "@/components/camera/form";
import { Pencil } from "lucide-react";

const cameras = [
  {
    id: 1,
    manufacturer: "Leica",
    description: "Leica Camera Description",
    model: "M5",
    serialNumber: "123456",
    timestamp: "2022-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    manufacturer: "Sony",
    description: "Sony Camera Description",
    model: "Z8",
    serialNumber: "345678",
    timestamp: "2022-01-01T00:00:00.000Z",
  },
];

export default function Dashboard() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">All Cameras</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Camera</Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add Camera</DialogTitle>
            </DialogHeader>
            <CameraForm />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Manufacturer</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>TimeStamp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cameras.map((camera) => (
              <TableRow key={camera.id}>
                <TableCell title={camera.description} className="font-medium">
                  {camera.manufacturer}
                </TableCell>
                <TableCell title={camera.description}>{camera.model}</TableCell>
                <TableCell title={camera.description}>
                  {camera.serialNumber}
                </TableCell>
                <TableCell title={camera.description}>
                  {new Date(camera.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <span className="sr-only">Edit</span>

                  <Dialog>
                    <DialogTrigger asChild>
                      <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
                        Edit <Pencil size={12} />
                      </span>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black">
                      <DialogHeader>
                        <DialogTitle>Update Camera</DialogTitle>
                      </DialogHeader>
                      <EditCameraForm />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
