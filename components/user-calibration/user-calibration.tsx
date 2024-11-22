"use client";

import React, { useState } from "react";
import PopupInstructions from "./popup-instructions";
import CalibrationProcess from "./calibration-process";
import SelectionPopup from "./selection-popups";
import CalibrationInstructions from "./calibration-instruction";

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

  const handleSelectionComplete = (user: string, panel: string) => {
    setSelectedUser(user);
    setSelectedPanel(panel);
    setStep(CalibrationStep.PopupInstructions);
  };
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
  const handlePopupInstructionsComplete = () => {
    setStep(CalibrationStep.CalibrationInstructions);
    toggleFullScreen()
  };

  const handleCalibrationInstructionsComplete = () => {
    setStep(CalibrationStep.CalibrationProcess);
  };

  const handleCalibrationComplete = () => {
    setStep(CalibrationStep.Complete);
  };


  return (
    <>
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
        <div>Calibration complete. You may close this window.</div>
      )}
    </>
  );
}
