"use client";

import { useFetch } from "@/lib/hooks";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CameraCalibration() {
  const [running, setRunning] = useState(false);
  const startCalibration = useFetch("/camera/calibration/start");
  const endCalibration = useFetch("/camera/calibration/stop");
  return (
    <Button
      disabled={startCalibration.loading || endCalibration.loading}
      onClick={() => {
        if (running) {
          endCalibration.fetchData({
            method: "POST",
          });
        } else {
          startCalibration.fetchData({
            method: "POST",
          });
        }
        setRunning(!running);
      }}
    >
      {running ? <>Stop</> : <>Start</>}
    </Button>
  );
}
