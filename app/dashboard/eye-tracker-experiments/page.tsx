"use client";

import CalibrationModal from "@/components/calibration-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFetch } from "@/lib/hooks";
import { useEffect, useState } from "react";

export default function EyeTrackerExperiments() {
  const [status, setStatus] = useState<boolean>(false);
  const eyeTrackerStatus = useFetch<boolean>("/et/run/status");
  const eyeTrackerStart = useFetch<string>("/et/run/start");
  const eyeTrackerStop = useFetch<string>("/et/run/stop");
  useEffect(() => {
    setStatus(eyeTrackerStatus.data);
  }, [eyeTrackerStatus.data]);
  useEffect(() => {
    eyeTrackerStatus.fetchData();
  }, [eyeTrackerStatus.fetchData]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <p className="font-bold">Eye Tracker</p>
        {eyeTrackerStatus.loading ? (
          <Button variant="outline" disabled>
            Loading
          </Button>
        ) : status ? (
          <Button
            variant="outline"
            onClick={() => {
              eyeTrackerStop.fetchData({
                method: "POST",
              });
              setStatus(false);
            }}
          >
            Stop
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              eyeTrackerStart.fetchData({
                method: "POST",
              });
              setStatus(true);
            }}
          >
            Start
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <CalibrationModal />
      </CardContent>
    </Card>
  );
}
