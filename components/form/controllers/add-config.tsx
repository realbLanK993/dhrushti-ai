"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/lib/hooks";
import { Controller, ControllerConfigType } from "@/lib/types/controller";
import { useState } from "react";

export function AddControllerConfigForm({
  controllers,
  setControllers,
}: {
  controllers: Controller[];
  setControllers: React.Dispatch<React.SetStateAction<ControllerConfigType[]>>;
}) {
  const [open, setOpen] = useState(false);
  const { fetchData, loading } = useFetch<ControllerConfigType>(
    "/controller/configuration/add"
  );
  const initialData = {
    uid: "",
    createdTimestamp: "",
    fpsGaze: 30,
    fpsCameraCalib: 30,
    fpsUserCalib: 30,
    isActive: true,
    controllerUID: "",
  };
  const [formData, setFormData] = useState<ControllerConfigType>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.controllerUID == "") {
      alert("Select Controller UID");
      return;
    }
    try {
      await fetchData({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setControllers((prev) => [
        ...prev,
        {
          ...formData,
          uid: (prev.length + 1).toString(), // Temporary UID, replace with actual server response if available
          createdTimestamp: new Date().toISOString(),
        },
      ]);
      setOpen(false);
      setFormData(initialData);
    } catch (err) {
      console.error("Error adding controller:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Controller Config</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Controller</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="controllerUID">Controller ID</Label>
            <Select
              value={formData.controllerUID}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  controllerUID: value,
                });
              }}
            >
              <SelectTrigger id="controllerUID">
                <SelectValue placeholder="Select a Controller" />
              </SelectTrigger>
              <SelectContent>
                {controllers.map((controller) => (
                  <SelectItem key={controller.uid} value={controller.uid}>
                    {controller.uid}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fpsGaze">FPS Gaze</Label>
            <Input value={30} disabled type="number" id="fpsGaze" />
          </div>
          <div>
            <Label htmlFor="fpsCameraCalib">FPS Camera Calibration</Label>
            <Input value={30} disabled type="number" id="fpsCameraCalib" />
          </div>
          <div>
            <Label htmlFor="fpsUserCalib">FPS User Calibration</Label>
            <Input value={30} disabled type="number" id="fpsUserCalib" />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
