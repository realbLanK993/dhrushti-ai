/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Point = { x: number; y: number };
type CameraType = "Camera 1" | "Camera 2" | "Camera 3";
type CameraData = {
  [key in CameraType]: Point | null;
};

const initialCameraData: CameraData = {
  "Camera 1": null,
  "Camera 2": null,
  "Camera 3": null,
};

export default function CameraLocationMarker({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedCamera, setSelectedCamera] = useState<CameraType | null>(null);
  const [cameraData, setCameraData] = useState<CameraData>(initialCameraData);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = reader.result as string;
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedCamera || !divRef.current) return;
    if (!backgroundImage) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newPoint = { x, y };

    setCameraData((prev) => ({ ...prev, [selectedCamera]: newPoint }));
  };

  const handleSubmit = () => {
    const isValid = Object.values(cameraData).every((point) => point !== null);
    if (!isValid) {
      alert("Please mark the location for all cameras.");
      return;
    }
    console.log("Submitting:", cameraData);
    setCameraData(initialCameraData);
    setSelectedCamera(null);
    setIsOpen(false);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="flex items-center gap-4">
        <Select
          onValueChange={(value: CameraType) => setSelectedCamera(value)}
          value={selectedCamera || undefined}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Camera" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Camera 1">Camera 1</SelectItem>
            <SelectItem value="Camera 2">Camera 2</SelectItem>
            <SelectItem value="Camera 3">Camera 3</SelectItem>
          </SelectContent>
        </Select>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="overflow-auto max-h-[600px]">
        <div
          ref={divRef}
          className="relative  w-full min-h-[200px] h-full cursor-crosshair border border-gray-300"
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
          {Object.entries(cameraData).map(
            ([camera, point], index) =>
              point && (
                <div
                  key={camera}
                  className="absolute w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <span className="absolute top-4 left-4 text-white bg-black px-1 rounded">
                    {index + 1}
                  </span>
                </div>
              )
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <Button onClick={handleSubmit} disabled={!backgroundImage}>
          Submit
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            selectedCamera &&
            setCameraData((prev) => ({ ...prev, [selectedCamera]: null }))
          }
          disabled={!selectedCamera}
        >
          Reset Camera
        </Button>
      </div>
    </div>
  );
}
