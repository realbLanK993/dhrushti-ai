"use client"
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useFetch } from "@/lib/hooks";
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
  const startCalibration = useFetch(`/et/calib/user/start`);
  const startRecordingUserCalibration = useFetch(`/et/calib/user/record/start`);
  const stopRecordingUserCalibration = useFetch(`/et/calib/user/record/stop`);
  const stopCalibration = useFetch(`/et/calib/user/stop`);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [green, setGreen] = useState(false);
  useEffect(() => {
    startCalibration.fetchData({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userUID, panelUID }) });
  },[]);
  useEffect(() => {
    if (currentDotIndex === 8) return;
    setTimeout(() => {
      startRecordingUserCalibration.fetchData({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pointUID: currentDotIndex +1}) });
      setGreen(true);
    }, 3000);
    setTimeout(() => {
      stopRecordingUserCalibration.fetchData({ method: "POST"});
      setGreen(false);
    }, 5000); 
    const interval = setInterval(() => {
      setCurrentDotIndex((prev) => {
        return prev + 1;
      });
    }, 6000);
    if (currentDotIndex === 8) {
      stopCalibration.fetchData({ method: "POST"});
      onComplete();
      clearInterval(interval);
      setCurrentDotIndex(-1);
    };
    return () => clearInterval(interval);
  }, [currentDotIndex]);

  return (
    <div className="inset-0 cursor-none fixed p-8 bg-red-600 rounded-lg flex items-center justify-center">
      <div className="relative w-full h-full">
        {currentDotIndex !== -1 && (
          <motion.div
            className={`w-6 h-6 z-10 rounded-full ${
              green ? "bg-green-400" : "bg-blue-400"
            } absolute`}
            animate={{
              left: dotPositions[currentDotIndex].x,
              top: dotPositions[currentDotIndex].y,
            }}
            transition={{ duration: 2 }}
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
