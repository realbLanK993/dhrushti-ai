"use client"
import React from "react";
import { Button } from "@/components/ui/button";

interface PopupInstructionsProps {
  onComplete: () => void;
}

export default function PopupInstructions({
  onComplete,
}: PopupInstructionsProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div>
        <ol className=" mb-4">
          <li>This is just an information that we are going to make this a full screen. Click continue to proceed</li>
        </ol>
        <Button onClick={onComplete}>Continue</Button>
      </div>
    </div>
  );
}
