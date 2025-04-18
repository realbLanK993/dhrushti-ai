export type Camera = {
  uid: string; // Unique ID for each camera
  createdTimestamp: string; // Timestamp for when the camera was added
  manufacturer: "basler"; // Camera's manufacturer
  model: "acA1440-220um"; // Camera's model
  serialNumber: string; // Camera's serial number
  isActive: boolean;
  description?: string; // Button that triggers Form 3
};

export type AddCameraProps = {
  manufacturer: "basler";
  model: "acA1440-220um";
  serialNumber: string;
  description?: string;
};

export type EditCameraProps = {
  cameraUID: string;
  description?: string;
  isActive: boolean;
};
