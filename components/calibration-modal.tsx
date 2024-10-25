/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CameraLocationMarker from "./camera-location-marker";

type Point = { x: number; y: number };
type PanelType = "Panel 1" | "Panel 2" | "Panel 3";
type CalibrationData = {
  [key in PanelType]: Point[];
};

const initialCalibrationData: CalibrationData = {
  "Panel 1": [],
  "Panel 2": [],
  "Panel 3": [],
};

export default function CalibrationModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPanel, setSelectedPanel] = useState<PanelType | null>(null);
  const [calibrationData, setCalibrationData] = useState<CalibrationData>(
    initialCalibrationData
  );
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const divRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedPanel) return;
    if (!backgroundImage) return;
    const rect = divRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const newPoint = { x, y };

      setCalibrationData((prev) => {
        const currentPoints = prev[selectedPanel];
        const updatedPoints =
          currentPoints.length < 4
            ? [...currentPoints, newPoint]
            : currentPoints;

        return {
          ...prev,
          [selectedPanel]: updatedPoints,
        };
      });
    }
  };

  const handleSubmit = () => {
    const isValid = Object.values(calibrationData).every(
      (points) => points.length === 4
    );

    if (!isValid) {
      alert("Please ensure all panels have exactly 4 points selected.");
      return;
    }

    console.log("Submitting:", calibrationData);
    setCalibrationData(initialCalibrationData);
    setSelectedPanel(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Calibration</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Calibration</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="panels" className="">
          <TabsList>
            <TabsTrigger value="panels">Panels</TabsTrigger>
            <TabsTrigger value="camera">Camera</TabsTrigger>
          </TabsList>
          <TabsContent value="panels" className="w-full">
            <div className="grid gap-4 py-4 w-full">
              <div className="flex items-center gap-4">
                <Select
                  onValueChange={(value: PanelType) => setSelectedPanel(value)}
                  value={selectedPanel || undefined}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Panel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Panel 1">Panel 1</SelectItem>
                    <SelectItem value="Panel 2">Panel 2</SelectItem>
                    <SelectItem value="Panel 3">Panel 3</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div
                ref={divRef}
                className="relative w-full min-h-[200px] h-full bg-gray-200 cursor-crosshair"
                onClick={handleDivClick}
              >
                {backgroundImage ? (
                  <img
                    src={backgroundImage}
                    alt="Upload an image"
                    className="w-full h-full object-cover absolute inset-0 border "
                  />
                ) : (
                  <div className="w-full h-full flex text-black/50 font-bold items-center justify-center">
                    <p>Upload an image</p>
                  </div>
                )}
                {Object.entries(calibrationData).map(([panel, points]) =>
                  points.map((point, index) => (
                    <div
                      key={`${panel}-${index}`}
                      className="absolute w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    >
                      <span className="absolute w-[4.6rem] top-4 left-4 text-white bg-black px-1 rounded">{`(${point.x.toFixed(
                        0
                      )}, ${point.y.toFixed(0)})`}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="flex flex-col gap-2 lg:flex-row">
                <Button onClick={handleSubmit} disabled={!backgroundImage}>
                  Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    selectedPanel &&
                    setCalibrationData((prev) => ({
                      ...prev,
                      [selectedPanel]: [],
                    }))
                  }
                  disabled={!selectedPanel}
                >
                  Reset Points
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="camera">
            <CameraLocationMarker setIsOpen={setIsOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
