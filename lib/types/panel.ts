export type Panel = {
  id: string; // Unique ID for each panel
  width: number; // Width in mm
  height: number; // Height in mm
  reportingUnits: "mm" | "pixels"; // Whether dimensions are reported in mm or pixels
  horizontalResolution?: number; // Horizontal resolution in pixels
  verticalResolution?: number; // Vertical resolution in pixels
  description?: string;
};

export type AddPanelProps = {
  width: number;
  height: number;
  reportingUnits: "mm" | "pixels";
  horizontalResolution?: number;
  verticalResolution?: number;
  description?: string;
};

export type EditPanelProps = {
  id: string;
  description?: string;
};
