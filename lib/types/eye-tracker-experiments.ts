export type EyeTrackerExperiment = {
  id: string; // Unique ID for each eye tracker experiment
  eyeTrackerProfileId: string; // Profile ID for the experiment
  created: Date; // Timestamp for when the experiment was created
  description?: string; // Button to open Form 11
};

export type AddEyeTrackerExperimentsProps = {
  description?: string; // Description for the experiment
};

export type EditEyeTrackerExperimentsProps = {
  id: string; // Unique ID for each eye tracker experiment
  eyeTrackerProfileId: string; // Profile ID for the experiment
  description?: string; // Description for the experiment
};
