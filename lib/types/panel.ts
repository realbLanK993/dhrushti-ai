export type Panel = {
  uid: string; // Unique ID for each panel
  width: number; // Width in mm
  height: number; // Height in mm
  units: "mm" | "pixel"; // Whether dimensions are reported in mm or pixels
  widthScaling?: number; // Horizontal resolution in pixels
  heightScaling?: number; // Vertical resolution in pixels
  description?: string;
};

export type AddPanelProps = {
  width: number;
  height: number;
  units: "mm" | "pixel";
  widthScaling?: number;
  heightScaling?: number;
  description?: string;
  unitsType: "float" | "int";
};

export type EditPanelProps = {
  uid: string;
  description?: string;
};
