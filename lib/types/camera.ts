export type Camera = {
  id: string; // Unique ID for each camera
  created: Date; // Timestamp for when the camera was added
  manufacturer: string; // Camera's manufacturer
  model: string; // Camera's model
  serialNumber: string; // Camera's serial number
  description?: string; // Button that triggers Form 3
};

export type AddCameraProps = {
  manufacturer: string;
  model: string;
  serialNumber: string;
  description?: string;
};

export type EditCameraProps = {
  id: string;
  description?: string;
};
