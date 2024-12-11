/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { useFetch } from "@/lib/hooks";
import { Panel } from "@/lib/types/panel";
import { Camera } from "@/lib/types/camera";

type Point = { x: number; y: number };
type CalibrationData = {
  [key in string]: Point[];
};
type CameraData = {
  [key in string]: Point | null;
};

export default function CalibrationModal() {
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [calibrationData, setCalibrationData] =
    useState<CalibrationData | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [cameraData, setCameraData] = useState<CameraData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const allPanels = useFetch<Panel[]>(`/panel/view/all`);
  const allCameras = useFetch<Camera[]>(`/camera/view/all`);
  const uploadImage = useFetch(`/et/calib/system/upload`);
  const submitData = useFetch(`/et/calib/system/metadata`);
  const divRef = useRef<HTMLDivElement>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    allPanels.fetchData();
    allCameras.fetchData();
  }, []);

  useEffect(() => {
    if (allPanels.data) {
      const initialCalibrationData: CalibrationData = allPanels.data.reduce(
        (acc, panel) => ({
          ...acc,
          [panel.uid]: [],
        }),
        {} as CalibrationData
      );

      setCalibrationData(initialCalibrationData);
    }
  }, [allPanels.data]);

  useEffect(() => {
    if (allCameras.data) {
      const initialCameraData: CameraData = allCameras.data.reduce(
        (acc, camera) => ({
          ...acc,
          [camera.uid]: null,
        }),
        {} as CameraData
      );
      setCameraData(initialCameraData);
    }
  }, [allCameras.data]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      uploadImage.fetchData({
        method: "POST",
        body: formData,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          console.log(img.height, img.width);

          setImageDimensions({
            width: img.width,
            height: img.width > 1000 ? (img.height / img.width) * 1000 : 1000,
          });
        };
        img.src = reader.result as string;
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
        if (prev) {
          const currentPoints = prev[selectedPanel];
          const updatedPoints =
            currentPoints.length < 4
              ? [...currentPoints, newPoint]
              : currentPoints;

          return {
            ...prev,
            [selectedPanel]: updatedPoints,
          };
        }
        return prev;
      });
    }
  };

  const handleSubmit = () => {
    // const isValidPanel = Object.values(calibrationData || {}).every(
    //   (points) => points.length === 4
    // );
    // const isValidCamera = Object.values(cameraData || {}).every(
    //   (point) => point !== null
    // );
    // if(!isValidPanel && !isValidCamera){
    //   alert("Please ensure all panels have exactly 4 points selected and mark the location for all cameras.");
    //   return
    // };
    // if (!isValidPanel) {
    //   alert("Please ensure all panels have exactly 4 points selected.");
    //   return;
    // }
    // if (!isValidCamera) {
    //   alert("Please mark the location for all cameras.");
    //   return;
    // }

    const returnCameraData = Object.entries(cameraData || {}).reduce(
      (acc, [key, value]) => {
        if (value) {
          //@ts-expect-error I dont know why this is happening
          acc[key] = [value.x, value.y];
        }
        return acc;
      },
      {} as CameraData
    );
    const returnCalibrationData = Object.entries(calibrationData || {}).reduce(
      (acc, [key, value]) => {
        if (value.length === 4) {
          //@ts-expect-error I dont know why this is happening
          acc[key] = value.map((point) => [point.x, point.y]);
        }
        return acc;
      },
      {} as CalibrationData
    );

    //remove all empty arrays from returnCalibrationData and returnCameraData
    // returnCalibrationData.forEach((panel) => {
    //   if (panel[Object.keys(panel)[0]]?.length === 0) {
    //     delete panel[Object.keys(panel)[0]];
    //   }
    // });
    // returnCameraData.forEach((camera) => {
    //   if (camera[Object.keys(camera)[0]]?.length === 0) {
    //     delete camera[Object.keys(camera)[0]];
    //   }
    // });
    // const filteredReturnCalibrationData = returnCalibrationData.filter(
    //   (obj) => Object.keys(obj).length > 0
    // );
    // const filteredReturnCameraData = returnCameraData.filter(
    //   (obj) => Object.keys(obj).length > 0
    // );

    // if (filteredReturnCalibrationData.length == 0) {
    //   alert("Please ensure all panels have exactly 4 points selected.");
    //   return;
    // }
    // if (filteredReturnCameraData.length == 0) {
    //   alert("Please mark the location for all cameras.");
    //   return;
    // }
    const formData = new FormData();
    if(backgroundImage) formData.append("file", backgroundImage);
    submitData.fetchData({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uid: "2024-11-24-07-42-19-685560",
        panels: returnCalibrationData,
        cameras: returnCameraData,
      }),
    });

    const initialCalibrationData: CalibrationData = allPanels.data.reduce(
      (acc, panel) => ({
        ...acc,
        [panel.uid]: [],
      }),
      {} as CalibrationData
    );

    const initialCameraData: CameraData = allCameras.data.reduce(
      (acc, camera) => ({
        ...acc,
        [camera.uid]: null,
      }),
      {} as CameraData
    );

    setCameraData(initialCameraData);
    setSelectedCamera(null);
    console.log(
      "Submitting:",
      returnCalibrationData,
      returnCameraData
    );
    setCalibrationData(initialCalibrationData);
    setSelectedPanel(null);
  };
  return (
    <Tabs defaultValue="panels" className="">
      <TabsList>
        <TabsTrigger value="panels">Panels</TabsTrigger>
        <TabsTrigger value="camera">Camera</TabsTrigger>
      </TabsList>
      <TabsContent value="panels" className="w-full">
        <div className="grid gap-4 py-4 w-full">
          <div className="flex items-center gap-4">
            <Select
              onValueChange={(value: string) => setSelectedPanel(value)}
              value={selectedPanel || undefined}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Panel" />
              </SelectTrigger>
              <SelectContent>
                {allPanels.data?.map((panel) => (
                  <SelectItem key={panel.uid} value={panel.uid}>
                    {panel.uid}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div
            ref={divRef}
            style={{
              height: imageDimensions?.height,
              width: imageDimensions?.width,
            }}
            className="relative w-full max-w-[1000px] h-full bg-gray-200 cursor-crosshair"
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
            {Object.entries(calibrationData || {}).map(([panel, points]) =>
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
        <CameraLocationMarker
          selectedCamera={selectedCamera}
          setSelectedCamera={setSelectedCamera}
          cameraData={cameraData}
          setCameraData={setCameraData}
          imageD={imageDimensions}
          background={backgroundImage}
          handleSubmit={handleSubmit}
          allCameras={allCameras.data}
        />
      </TabsContent>
    </Tabs>
  );
}
