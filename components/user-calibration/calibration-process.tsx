"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useFetch } from "@/lib/hooks";

const STEP_DURATION = 200;
const ITERATION_DURATION = 400;
const DURATION_BETWEEN_ITERATIONS = 200;

export default function CalibrationProcess({
  userUID,
  panelUID,
  onComplete,
}: {
  userUID: string;
  panelUID: string;
  onComplete: () => void;
}) {
  const dotPositions = [
    { x: "0%", y: "0%" },
    { x: "50%", y: "0%" },
    { x: "100%", y: "0%" },
    { x: "0%", y: "50%" },
    { x: "50%", y: "50%" },
    { x: "100%", y: "50%" },
    { x: "0%", y: "100%" },
    { x: "50%", y: "100%" },
    { x: "100%", y: "100%" },
  ];

  const startCalibration = useFetch(`/user/calibration/start`);
  const startRecordingUserCalibration = useFetch(
    `/user/calibration/record/start`
  );
  const stopRecordingUserCalibration = useFetch(
    `/user/calibration/record/stop`
  );
  const stopCalibration = useFetch(`/user/calibration/stop`);

  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [green, setGreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(
    (pointIdx: number) => {
      return startRecordingUserCalibration.fetchData({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pointIdx }),
      });
    },
    [startRecordingUserCalibration, userUID, panelUID]
  );

  const stopRecording = useCallback(() => {
    return stopRecordingUserCalibration.fetchData({
      method: "POST",
    });
  }, [stopRecordingUserCalibration]);

  useEffect(() => {
    startCalibration.fetchData({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userUID, panelUID }),
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const eachIteration = useCallback(async () => {
    setGreen(true);
    await startRecording(currentDotIndex + 1);
    await new Promise((resolve) => setTimeout(resolve, STEP_DURATION));
    setGreen(false);
    await stopRecording();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentDotIndex((prev) => prev + 1);
    if (currentDotIndex == 8) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      await stopCalibration
        .fetchData({ method: "POST" })
        .then(() => {
          console.log("called stop calibration");
          onComplete();
        })
        .catch((err) => console.log(err));
      return;
    }
  }, [
    currentDotIndex,
    startRecording,
    stopRecording,
    stopCalibration,
    onComplete,
  ]);

  useEffect(() => {
    intervalRef.current = setInterval(eachIteration, ITERATION_DURATION);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [eachIteration]);

  return (
    <div className="inset-0 cursor-none fixed p-8 bg-red-600 rounded-lg flex items-center justify-center">
      <div className="relative w-full h-full">
        {currentDotIndex < 9 && (
          <motion.div
            className={`w-6 h-6 z-10 rounded-full absolute`}
            animate={{
              left: dotPositions[currentDotIndex].x,
              top: dotPositions[currentDotIndex].y,
              backgroundColor: green ? "#4ade80" : "#60a5fa",
            }}
            transition={{ duration: DURATION_BETWEEN_ITERATIONS / 1000 }}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        {dotPositions.map((dot, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full bg-yellow-400 absolute"
            style={{
              left: `${dot.x}`,
              top: `${dot.y}`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
