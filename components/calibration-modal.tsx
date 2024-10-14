"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for our data structures
type Point = { x: number; y: number };
type Panel = string;

// Mock API functions
const getCalibrationImage = async (): Promise<string> => {
  // In a real scenario, this would be an API call
  return "https://v0.dev/placeholder.svg?height=600&width=800";
};

const getPanels = async (): Promise<Panel[]> => {
  // In a real scenario, this would be an API call
  return ["Panel 1", "Panel 2", "Panel 3"];
};

export default function CalibrationModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [panels, setPanels] = useState<Panel[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      getCalibrationImage().then(setImageUrl);
      getPanels().then(setPanels);
    }
  }, [isOpen]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (points.length >= 4) return;

    const rect = imageRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPoints([...points, { x, y }]);
    }
  };

  const handleSubmit = () => {
    if (points.length !== 4 || !selectedPanel) {
      alert("Please select 4 points and a panel before submitting.");
      return;
    }

    // Here you would typically send this data to your backend
    console.log("Submitting:", { panel: selectedPanel, coordinates: points });

    // Reset state and close modal
    setPoints([]);
    setSelectedPanel(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Calibration</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black w-full min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Display Calibration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            {imageUrl && (
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Calibration"
                className="w-full h-auto"
                onClick={handleImageClick}
              />
            )}
            {points.map((point, index) => (
              <div
                key={index}
                className="absolute w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ left: point.x, top: point.y }}
              >
                <span className="absolute top-4 left-4 text-white bg-black px-1 rounded">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Select
              onValueChange={(value: Panel) => setSelectedPanel(value)}
              value={selectedPanel || undefined}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Panel" />
              </SelectTrigger>
              <SelectContent>
                {panels.map((panel) => (
                  <SelectItem key={panel} value={panel}>
                    {panel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleSubmit}
              disabled={points.length !== 4 || !selectedPanel}
            >
              Submit
            </Button>
            <Button variant="outline" onClick={() => setPoints([])}>
              Reset Points
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
