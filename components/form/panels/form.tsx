"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {Panel } from "@/lib/types/panel";
import { useFetch } from "@/lib/hooks";

export const PanelForm = ({setPanels}:{setPanels: React.Dispatch<React.SetStateAction<Panel[]>>}) => {
  const [isMM, setIsMM] = useState(true);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [units, setUnits] = useState<"mm" | "pixels">("mm");
  const [widthScaling, setWidthScaling] = useState<number>(1);
  const [heightScaling, setHeightScaling] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { fetchData } = useFetch<Panel>("/panel/add");
  
  const addPanelForm = () => {
    return fetchData({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        width,
        height,
        units,
        widthScaling,
        heightScaling,
        description,
        points: [
          [1, 2],
          [3, 4],
        ],
      }),
    }).then(() => {
      if (!width || !height) {
        setError("Width and Height are required");
        return;
      }
      if (!isMM && (!widthScaling || !heightScaling)) {
        setError("Horizontal and Vertical Resolution are required");
        return;
      }
      
      setPanels((prev) => [
        {
          uid: `${prev.length + 1}`,
          width,
          height,
          units,
          widthScaling,
          heightScaling,
          description: description ?? "",
        },
        ...prev,
      ]);
    }).catch(err => {
      console.log("Error: \n", err);
    }).finally(() => setOpen(false));
    
  }
  useEffect(() => {
    const clearError = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(clearError);
  }, [error]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Panel</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Panel</DialogTitle>
        </DialogHeader>
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
                setUnits(e as "mm" | "pixels");
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
                  value={widthScaling ?? ""}
                  onChange={(e) =>
                    setWidthScaling(parseInt(e.target.value))
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
                  value={heightScaling ?? ""}
                  onChange={(e) =>
                    setHeightScaling(parseInt(e.target.value))
                  }
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
                if (units == "mm") {
                  setWidthScaling(1);
                  setHeightScaling(1);
                }
                addPanelForm();
              }}
              type="submit"
            >
              Add
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

