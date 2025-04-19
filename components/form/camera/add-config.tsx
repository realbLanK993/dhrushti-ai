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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, CameraConfigType } from "@/lib/types/camera";
import { useFetch } from "@/lib/hooks";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddCameraConfigForm({
  setConfigs,
  cameras,
}: {
  setConfigs: React.Dispatch<React.SetStateAction<CameraConfigType[]>>;
  cameras: Camera[];
}) {
  const [open, setOpen] = useState(false);
  const { fetchData, loading } = useFetch<CameraConfigType>(
    "/camera/configuration/add"
  );

  const [formData, setFormData] = useState({
    cameraUID: "",
    imageWidth: 1440,
    imageHeight: 1080,
    pixelFormat: "Mono8" as const,
    exposureTime: 32,
    triggerSelector: "FrameStart" as const,
    triggerSource: "Line1" as "Line1" | "Line2" | "Line3" | "Line4",
    triggerActivation: "RisingEdge" as "RisingEdge" | "FallingEdge",
    triggerDelay: 0,
    gain: 10,
    noiseReduction: 1,
    sharpnessEnhancement: 1,
    blackLevel: 1,
    gamma: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchData({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setConfigs((prev) => [
        ...prev,
        {
          ...formData,
          uid: `${formData.cameraUID}-${Date.now()}`, // Temporary UID, replace with actual server response if available
          createdTimestamp: new Date().toISOString(),
        },
      ]);
      setOpen(false);
      setFormData({
        cameraUID: "",
        imageWidth: 1440,
        imageHeight: 1080,
        pixelFormat: "Mono8",
        exposureTime: 32,
        triggerSelector: "FrameStart",
        triggerSource: "Line1",
        triggerActivation: "RisingEdge",
        triggerDelay: 0,
        gain: 10,
        noiseReduction: 1,
        sharpnessEnhancement: 1,
        blackLevel: 1,
        gamma: 1,
      });
    } catch (err) {
      console.error("Error adding config:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Camera Config</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Camera Configuration</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[300px] h-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cameraUID">Camera UID</Label>
              <Select
                value={formData.cameraUID}
                onValueChange={(value) =>
                  setFormData({ ...formData, cameraUID: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a camera" />
                </SelectTrigger>
                <SelectContent>
                  {cameras.map((camera) => (
                    <SelectItem key={camera.uid} value={camera.uid}>
                      {camera.uid}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="imageWidth">Image Width</Label>
              <Input
                id="imageWidth"
                type="number"
                value={formData.imageWidth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageWidth: parseInt(e.target.value),
                  })
                }
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="imageHeight">Image Height</Label>
              <Input
                id="imageHeight"
                type="number"
                value={formData.imageHeight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageHeight: parseInt(e.target.value),
                  })
                }
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="pixelFormat">Pixel Format</Label>
              <Select value={formData.pixelFormat} disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mono8">Mono8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="exposureTime">Exposure Time</Label>
              <Input
                id="exposureTime"
                type="number"
                value={formData.exposureTime}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="triggerSource">Trigger Source</Label>
              <Select
                value={formData.triggerSource}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    triggerSource: value as
                      | "Line1"
                      | "Line2"
                      | "Line3"
                      | "Line4",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Line1">Line1</SelectItem>
                  <SelectItem value="Line2">Line2</SelectItem>
                  <SelectItem value="Line3">Line3</SelectItem>
                  <SelectItem value="Line4">Line4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="triggerActivation">Trigger Activation</Label>
              <Select
                value={formData.triggerActivation}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    triggerActivation: value as "RisingEdge" | "FallingEdge",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RisingEdge">RisingEdge</SelectItem>
                  <SelectItem value="FallingEdge">FallingEdge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="triggerDelay">Trigger Delay</Label>
              <Input
                id="triggerDelay"
                type="number"
                value={formData.triggerDelay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    triggerDelay: parseInt(e.target.value),
                  })
                }
                min={0}
                required
              />
            </div>
            <div>
              <Label htmlFor="gain">Gain</Label>
              <Input
                id="gain"
                type="number"
                value={formData.gain}
                onChange={(e) =>
                  setFormData({ ...formData, gain: parseInt(e.target.value) })
                }
                min={0}
                required
              />
            </div>
            <div>
              <Label htmlFor="noiseReduction">Noise Reduction</Label>
              <Input
                id="noiseReduction"
                type="number"
                value={formData.noiseReduction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noiseReduction: parseInt(e.target.value),
                  })
                }
                min={0}
                required
              />
            </div>
            <div>
              <Label htmlFor="sharpnessEnhancement">
                Sharpness Enhancement
              </Label>
              <Input
                id="sharpnessEnhancement"
                type="number"
                value={formData.sharpnessEnhancement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sharpnessEnhancement: parseInt(e.target.value),
                  })
                }
                min={0}
                required
              />
            </div>
            <div>
              <Label htmlFor="blackLevel">Black Level</Label>
              <Input
                id="blackLevel"
                type="number"
                value={formData.blackLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    blackLevel: parseInt(e.target.value),
                  })
                }
                min={0}
                required
              />
            </div>
            <div>
              <Label htmlFor="gamma">Gamma</Label>
              <Input
                id="gamma"
                type="number"
                value={formData.gamma}
                onChange={(e) =>
                  setFormData({ ...formData, gamma: parseInt(e.target.value) })
                }
                min={0}
                required
              />
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
