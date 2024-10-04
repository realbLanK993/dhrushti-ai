import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const CameraForm = () => {
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
            {/* <SelectItem disabled value="empty">
              Empty
            </SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="manufacturer">
          Manufacturer <span className="text-red-500">*</span>
        </Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem disabled value="empty">
              Empty
            </SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="model">
          Model <span className="text-red-500">*</span>
        </Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem disabled value="empty">
              Empty
            </SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="description">
          Description
        </Label>
        <Textarea id="description" />
      </div>
      <Button className="w-full">Add</Button>
    </div>
  );
};

export const EditCameraForm = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2 pt-8">
        <Label className="font-bold" htmlFor="serial">
          Serial Number <span className="text-red-500">*</span>
        </Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Serial Number" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem disabled value="empty">
              Empty
            </SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="manufacturer">
          Manufacturer <span className="text-red-500">*</span>
        </Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem disabled value="empty">
              Empty
            </SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="model">
          Model <span className="text-red-500">*</span>
        </Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem disabled value="empty">
              Empty
            </SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold" htmlFor="description">
          Description
        </Label>
        <Textarea id="description" />
      </div>
      <Button className="w-full">Update</Button>
    </div>
  );
};
