"use client"
import React from "react";
import { Button } from "@/components/ui/button";

interface CalibrationInstructionsProps {
  onComplete?: () => void;
}

export default function CalibrationInstructions({
  onComplete,
}: CalibrationInstructionsProps) {
   
  return (
    <div className="p-4 fixed inset-0 bg-background flex gap-4 justify-center items-center flex-col border rounded shadow w-screen h-screen">
      <Button className="absolute top-10 right-10 z-[100]" onClick={onComplete}>Start Calibration</Button>
      <div className="max-w-[1000px] w-full">
        <video width={1000} controls>
          <source src="/calibration-screen.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-col gap-2 justify-center max-w-[1000px] w-full">
        <h2 className="text-lg font-bold mb-4">Calibration Instructions</h2>
        <ol className="list-decimal list-inside mb-4">
          <li>
            Follow the blue dot once it appears on the screen on the top-left
            until it exits the screen at the bottom-right.
          </li>
          <li>
            The dot will change colour to green when it lands on each yellow
            circle.
          </li>
          <li>Focus on the green dot.</li>
          <li>
            The dot will remain green for 2 seconds and will return back to blue
            colour.
          </li>
          <li>Continue following the blue dot.</li>
          <li>
            Continue following the blue dot as it moves through all 9 points.
          </li>
          <li>
            Remember to focus on the dot when it is green in each of the 9
            points.
          </li>
        </ol>
      </div>
    </div>
  );
}
