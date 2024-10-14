"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

// Define types for our data structures
type Point = { x: number; y: number };
type Panel = string;

// Mock API function to get panels
const getPanels = async (): Promise<Panel[]> => {
  // In a real scenario, this would be an API call
  return ["Panel 1", "Panel 2", "Panel 3"];
};

export default function CalibrationModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      getPanels().then(setPanels);
    }
  }, [isOpen]);

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (points.length >= 4) return;

    const rect = divRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

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
      <DialogContent className="w-full bg-white text-black rounded overflow-scroll md:overflow-auto">
        <DialogHeader>
          <DialogTitle>Display Calibration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            ref={divRef}
            className="relative md:h-[200px] w-full flex flex-col justify-center items-center aspect-video bg-gray-200 cursor-crosshair"
            onClick={handleDivClick}
          >
            <span className="font-bold flex justify-center items-center flex-col gap-4 text-black/60">
              {selectedPanel ?? "Select a panel"}
              <span>{selectedPanel && <>16:9</>}</span>
            </span>
            {points.map((point, index) => (
              <React.Fragment key={index}>
                <div
                  className="absolute w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                ></div>
                <div
                  className="absolute min-w-[5.5rem] h-6 px-2 bg-black text-white rounded-full"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  {index + 1} ({point.x.toFixed(0)}, {point.y.toFixed(0)})
                </div>
              </React.Fragment>
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
