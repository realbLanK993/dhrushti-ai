"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { AddPanelProps, EditPanelProps, Panel } from "@/lib/types/panel";

export const PanelForm = ({
  addPanel,
}: {
  addPanel: (props: AddPanelProps) => void;
}) => {
  const [isMM, setIsMM] = useState(true);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [reportingUnits, setReportingUnits] = useState<"mm" | "pixels">("mm");
  const [horizontalResolution, setHorizontalResolution] = useState<
    number | undefined
  >(undefined);
  const [verticalResolution, setVerticalResolution] = useState<
    number | undefined
  >(undefined);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const clearError = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(clearError);
  }, [error]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="width">
          Width <span className="text-red-500">*</span>
        </Label>
        <Input
          onChange={(e) => setWidth(parseInt(e.target.value))}
          value={width}
          required
          id="width"
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="height">
          Height <span className="text-red-500">*</span>
        </Label>
        <Input
          onChange={(e) => setHeight(parseInt(e.target.value))}
          value={height}
          required
          id="height"
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="reportingUnits">
          Reporting Units <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={(e) => {
            setIsMM(e === "mm");
            setReportingUnits(e as "mm" | "pixels");
          }}
          defaultValue="mm"
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Reporting Units" />
          </SelectTrigger>
          <SelectContent defaultValue={"mm"}>
            <SelectItem defaultChecked value="mm">
              mm
            </SelectItem>
            <SelectItem value="pixels">pixels</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!isMM && (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="horizontalResolution">
              Horizontal Resolution <span className="text-red-500">*</span>
            </Label>
            <Input
              value={horizontalResolution ?? ""}
              onChange={(e) =>
                setHorizontalResolution(parseInt(e.target.value))
              }
              required
              id="horizontalResolution"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="verticalResolution">
              Vertical Resolution <span className="text-red-500">*</span>
            </Label>
            <Input
              value={verticalResolution ?? ""}
              onChange={(e) => setVerticalResolution(parseInt(e.target.value))}
              required
              id="verticalResolution"
              type="number"
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="description"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DialogFooter>
        <Button
          onClick={() => {
            if (!width || !height) {
              setError("Width and Height are required");
              return;
            }
            if (!isMM && (!horizontalResolution || !verticalResolution)) {
              setError("Horizontal and Vertical Resolution are required");
              return;
            }
            addPanel({
              width: width,
              height,
              description: description,
              reportingUnits: reportingUnits,
              horizontalResolution: horizontalResolution,
              verticalResolution: verticalResolution,
            });
          }}
          type="submit"
        >
          Add
        </Button>
      </DialogFooter>
    </div>
  );
};

export const EditPanelForm = ({
  panel,
  editPanel,
}: {
  panel: Panel;
  editPanel: (props: EditPanelProps) => void;
}) => {
  const [data, setData] = useState({ ...panel });
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          onChange={(e) => setData({ ...data, description: e.target.value })}
          value={data.description ?? ""}
          id="description"
        />
      </div>
      <DialogFooter>
        <Button
          onClick={() => setData({ ...data, description: "" })}
          variant={"outline"}
        >
          Clear
        </Button>
        <Button
          onClick={() =>
            editPanel({ id: panel.id, description: data.description })
          }
          type="submit"
        >
          Update
        </Button>
      </DialogFooter>
    </div>
  );
};
