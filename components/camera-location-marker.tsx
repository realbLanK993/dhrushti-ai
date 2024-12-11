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
import { Camera } from "@/lib/types/camera";

type Point = { x: number; y: number };
type CameraDataType = {
  [key in string]: Point | null;
};



export default function CameraLocationMarker({
  background,
  imageD,
  cameraData,
  setCameraData,
  selectedCamera,
  setSelectedCamera,
  handleSubmit,
  allCameras
}: {
  background?: string;
  imageD: { width: number; height: number } | null;
  allCameras?:Camera[];
  cameraData: CameraDataType | null;
  setCameraData: React.Dispatch<React.SetStateAction<CameraDataType | null>>;
  selectedCamera: string | null;
  setSelectedCamera: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    background
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(imageD);
  const divRef = useRef<HTMLDivElement>(null);

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedCamera || !divRef.current) return;
    if (!backgroundImage) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newPoint = { x, y };

    setCameraData((prev) => ({ ...prev, [selectedCamera]: newPoint }));
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="flex items-center gap-4">
        <Select
          onValueChange={(value: string) => setSelectedCamera(value)}
          value={selectedCamera || undefined}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Camera" />
          </SelectTrigger>
          <SelectContent>
            {allCameras &&
              allCameras.map((camera) => (
                <SelectItem key={camera.uid} value={camera.uid}>
                  {camera.uid}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <div
          ref={divRef}
          style={{
            height: imageDimensions?.height,
            width: imageDimensions?.width,
          }}
          className="relative max-w-[1000px] cursor-crosshair border border-gray-300"
          onClick={handleDivClick}
        >
          {backgroundImage && imageDimensions ? (
            <img
              src={backgroundImage}
              alt="Upload an image"
              style={{
                width: imageDimensions.width,
                height: imageDimensions.height,
              }}
              className="object-cover w-full h-full absolute inset-0 border "
            />
          ) : (
            <div className="w-full h-full flex text-black/50 font-bold items-center justify-center">
              <p>Upload an image</p>
            </div>
          )}
          {cameraData &&
            Object.entries(cameraData).map(
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
