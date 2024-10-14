import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddCameraProps, Camera, EditCameraProps } from "@/lib/types/camera";

export const CameraForm = ({
  addCamera,
}: {
  addCamera: (props: AddCameraProps) => void;
}) => {
  const [description, setDescription] = useState("");
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2 pt-8">
        <Label className="font-bold" htmlFor="serial">
          Serial Number <span className="text-red-500">*</span>
        </Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Serial Number" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem disabled value="empty">
              Empty
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="manufacturer">
          Manufacturer <span className="text-red-500">*</span>
        </Label>
        <Select disabled defaultValue="basler" required>
          <SelectTrigger>
            <SelectValue placeholder="Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem disabled value="basler">
              Basler
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="model">
          Model <span className="text-red-500">*</span>
        </Label>
        <Select disabled defaultValue="aca1440-220um" required>
          <SelectTrigger>
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem disabled value="aca1440-220um">
              aca1440-220um
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="description">
          Description
        </Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
        />
      </div>
      <DialogFooter>
        <Button
          onClick={() => {
            addCamera({
              manufacturer: "Basler",
              model: "aca1440-220um",
              serialNumber: "SN123456789",
              description: description,
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

export const EditCameraForm = ({
  camera,
  editCamera,
}: {
  camera: Camera;
  editCamera: (props: EditCameraProps) => void;
}) => {
  const [data, setData] = useState({ ...camera });
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="description">
          Description
        </Label>
        <Textarea
          value={data.description ?? ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
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
            editCamera({ id: data.id, description: data.description })
          }
          type="submit"
        >
          Update
        </Button>
      </DialogFooter>
    </div>
  );
};
