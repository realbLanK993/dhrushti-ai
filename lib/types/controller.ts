export type Controller = {
  uid: string;
  createdTimestamp: string;
  manufacturer: "digilent";
  serialNumber: string;
  isActive?: boolean;
  description?: string;
};

export type ControllerConfigType = {
  uid: string;
  createdTimestamp: string;
  controllerUID: string;
  fpsGaze: number;
  fpsCameraCalib: number;
  fpsUserCalib: number;
  isActive: boolean;
};

export type AddControllerProps = {
  manufacturer: "digilent";
  serialNumber: string;
  isActive?: boolean;
  description?: string;
};
