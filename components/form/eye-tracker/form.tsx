"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AddEyeTrackerProfileProps,
  EditEyeTrackerProfileProps,
  EyeTrackerProfile,
} from "@/lib/types/eye-tracker";
import { Pencil } from "lucide-react";
import { useFetch } from "@/lib/hooks";

export const EyeTrackerForm = ({
  setEyeTrackerProfiles,
}:{
  eyeTrackerProfiles: EyeTrackerProfile[],
  setEyeTrackerProfiles: React.Dispatch<React.SetStateAction<EyeTrackerProfile[]>>
}) => {
  const [description, setDescription] = useState<string>();
  const [open, setOpen] = useState(false)
  const {fetchData,data, loading} = useFetch<EyeTrackerProfile>(`/et/profile/add`);
  useEffect(() => {
    setEyeTrackerProfiles(prev => [...prev, data])
    console.log(data,"data");
    
  },[data])
  const addEyeTrackerProfile = ({
    description,}:AddEyeTrackerProfileProps) =>{
      fetchData({method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify({description})}).catch((err) => console.log(err)).finally(() => setOpen(false));
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Profile</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Eye Tracker Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
            />
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={() =>
                addEyeTrackerProfile({ description: description ?? "" })
              }
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

export const EditEyeTrackerForm = ({
  eyeTracker,
  setEyeTrackerProfiles,
}: {
  eyeTracker: EyeTrackerProfile;
  setEyeTrackerProfiles: React.Dispatch<React.SetStateAction<EyeTrackerProfile[]>>
}) => {
  const [data, setData] = useState({ ...eyeTracker });
  const [open, setOpen] = useState(false);
  const { fetchData, loading } =
    useFetch<EyeTrackerProfile>(`/et/profile/update`);
  const editEyeTrackerProfile = async({
    description,
  }: EditEyeTrackerProfileProps) => {
    await fetchData({
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({ uid:eyeTracker.uid,description})
    })
    setEyeTrackerProfiles(prev =>{
      const index = prev.findIndex((eyeTrackerProfile) => eyeTrackerProfile.uid === eyeTracker.uid);
      if (index == -1) {
        alert("No such Eye Tracker Profile exists");
      }
      prev[index].description = description ?? "";
      return [...prev];
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="underline w-full cursor-pointer flex gap-2 justify-end items-center">
          Edit <Pencil size={12} />
        </span>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Eye Tracker {eyeTracker.uid}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-2">
            <Checkbox
              disabled
              onCheckedChange={(e: boolean) => setData({ ...data, isActive: !e })}
              checked={!data.isActive}
              id="disable"
            />
            <Label htmlFor="disable">Disable</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              value={data.description ?? ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              id="description"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setData({ ...eyeTracker, description: "" })}
              variant={"outline"}
            >
              Clear
            </Button>
            <Button
              disabled={loading}
              onClick={() => editEyeTrackerProfile({ ...data })}
              type="submit"
            >
              Update
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
