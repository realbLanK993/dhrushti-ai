export type CameraCalibrations = {
  uid: string;
  createdTimestamp: string;
  refCamUID: number;
  isActive: boolean;
  description?: string;
};

export type PanelCalibrations = {
  uid: string;
  createdTimestamp: string;
  camCalibUID: number;
  isActive: boolean;
  description?: string;
};
