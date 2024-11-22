import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Camera } from "@/lib/types/camera";
import { useFetch } from "@/lib/hooks";
import { Loader2 } from "lucide-react";

export const CameraForm = ({
  setData
}:{
  setData: React.Dispatch<React.SetStateAction<Camera[]>>
}) => {
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { data,loading, error, fetchData } = useFetch<Camera>("/camera/add");
  useEffect(() => {
    if (data) {
      setData(prev => [data,...prev ]);
    }
  },[data, setData])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Camera</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Camera</DialogTitle>
        </DialogHeader>
        {error ? (
          <div>{error.message}</div>
        ) : (
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-2 pt-8">
              <Label className="font-bold" htmlFor="serial">
                Serial Number <span className="text-red-500">*</span>
              </Label>
              <Select required defaultValue="SN09876542">
                <SelectTrigger>
                  <SelectValue placeholder="Serial Number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem disabled value="SN09876542">
                    SN09876542
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
              <Select disabled defaultValue="acA1440-220um" required>
                <SelectTrigger>
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem disabled value="acA1440-220um">
                    acA1440-220um
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
              <Button disabled={loading} onClick={() => {
                const newCamera = {
                    manufacturer: "basler",
                    model: "acA1440-220um",
                    serialNumber: "SN123456789",
                    description,
                  }
                fetchData({
                  method: "POST",
                  headers:{
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newCamera),
                })
                setOpen(false);
                 }} type="submit">
                {
                  loading
                    ? <span className="flex gap-2 items-center"> <Loader2 className="animate-spin" size={16} /> Loading</span>
                    : "Add "
                }
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

