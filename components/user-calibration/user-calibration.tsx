"use client";

import React, { useEffect, useState } from "react";
import PopupInstructions from "./popup-instructions";
import CalibrationProcess from "./calibration-process";
import SelectionPopup from "./selection-popups";
import CalibrationInstructions from "./calibration-instruction";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
enum CalibrationStep {
  Selection,
  PopupInstructions,
  CalibrationInstructions,
  CalibrationProcess,
  Complete,
}

export default function UserCalibration() {
  const [step, setStep] = useState<CalibrationStep>(CalibrationStep.Selection);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedPanel, setSelectedPanel] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleSelectionComplete = (user: string, panel: string) => {
    setSelectedUser(user);
    setSelectedPanel(panel);
    setStep(CalibrationStep.PopupInstructions);
  };
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      console.log("exiting fullscreen");

      document.exitFullscreen();
    }
  }
  function reset() {
    setStep(CalibrationStep.Selection);
    setSelectedPanel("");
    setSelectedUser("");
  }

  useEffect(() => {
    function alertFullScreen() {
      if (!document.fullscreenElement) {
        alert(
          "Are you sure you want to exit fullscreen? This will stop the calibration process."
        );
        setStep(CalibrationStep.PopupInstructions);
      }
    }
    if (step == CalibrationStep.CalibrationProcess) {
      document.addEventListener("fullscreenchange", alertFullScreen);
    } else {
      document.removeEventListener("fullscreenchange", alertFullScreen);
    }
    return () => {
      document.removeEventListener("fullscreenchange", alertFullScreen);
    };
  }, [step]);
  useEffect(() => {
    if (step == CalibrationStep.CalibrationProcess) {
      if (!open) {
        setStep(CalibrationStep.Selection);
      } else {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        }
      }
    }
  }, [step, open]);
  const handlePopupInstructionsComplete = () => {
    setStep(CalibrationStep.CalibrationInstructions);
    toggleFullScreen();
  };

  const handleCalibrationInstructionsComplete = () => {
    setStep(CalibrationStep.CalibrationProcess);
  };

  const handleCalibrationComplete = () => {
    console.log("calibration complete");

    setStep(CalibrationStep.Complete);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>User Calibration</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen flex flex-col h-screen">
        <DialogHeader className="w-fit h-fit">
          <DialogTitle>User Calibration</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full justify-center items-center">
          {step === CalibrationStep.Selection && (
            <SelectionPopup onComplete={handleSelectionComplete} />
          )}
          {step === CalibrationStep.PopupInstructions && (
            <PopupInstructions onComplete={handlePopupInstructionsComplete} />
          )}
          {step === CalibrationStep.CalibrationInstructions && (
            <CalibrationInstructions
              onComplete={handleCalibrationInstructionsComplete}
            />
          )}
          {step === CalibrationStep.CalibrationProcess && (
            <CalibrationProcess
              userUID={selectedUser}
              panelUID={selectedPanel}
              onComplete={handleCalibrationComplete}
            />
          )}
          {step === CalibrationStep.Complete && (
            <div className="w-full h-full flex justify-center items-center flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-xl tracking-tighter font-bold flex gap-2 items-center">
                  Calibration complete <CheckCircle />
                </p>
                <span className="text-gray-700 text-sm">
                  You can now close this window
                </span>
              </div>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    toggleFullScreen();
                    reset();
                  }}
                  variant={"outline"}
                >
                  Close
                </Button>
              </DialogClose>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
