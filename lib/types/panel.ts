export type Panel = {
  uid: string; // Unique ID for each panel
  width: number; // Width in mm
  height: number; // Height in mm
  units: "mm" | "pixels"; // Whether dimensions are reported in mm or pixels
  widthScaling?: number; // Horizontal resolution in pixels
  heightScaling?: number; // Vertical resolution in pixels
  description?: string;
};

export type AddPanelProps = {
  width: number;
  height: number;
  units: "mm" | "pixels";
  widthScaling?: number;
  heightScaling?: number;
  description?: string;
};

export type EditPanelProps = {
  uid: string;
  description?: string;
};
