export type EyeTrackerProfile = {
  id: string; // Unique ID for each eye tracker profile
  created: Date; // Timestamp for when the profile was created
  active: boolean; // Status: Yes (true) or No (false)
  description?: string; // Button to open Form 7
};

export type AddEyeTrackerProfileProps = {
  description?: string;
};

export type EditEyeTrackerProfileProps = {
  id: string;
  active: boolean;
  description?: string;
};
