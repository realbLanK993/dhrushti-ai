export type EyeTrackerProfile = {
  uid: string; // Unique ID for each eye tracker profile
  createdTimestamp: Date; // Timestamp for when the profile was created
  isActive: boolean; // Status: Yes (true) or No (false)
  description?: string; // Button to open Form 7
};

export type AddEyeTrackerProfileProps = {
  description?: string;
};

export type EditEyeTrackerProfileProps = {
  uid: string;
  isActive: boolean;
  description?: string;
};
