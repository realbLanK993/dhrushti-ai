"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  AddEyeTrackerProfileProps,
  EditEyeTrackerProfileProps,
  EyeTrackerProfile,
} from "@/lib/types/eye-tracker";

export const EyeTrackerForm = ({
  addEyeTrackerProfile,
}: {
  addEyeTrackerProfile: (props: AddEyeTrackerProfileProps) => void;
}) => {
  const [description, setDescription] = useState<string>();
  return (
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
          onClick={() =>
            addEyeTrackerProfile({ description: description ?? "" })
          }
          type="submit"
        >
          Add
        </Button>
      </DialogFooter>
    </div>
  );
};

export const EditEyeTrackerForm = ({
  editEyeTrackerProfile,
  eyeTracker,
}: {
  eyeTracker: EyeTrackerProfile;
  editEyeTrackerProfile: (props: EditEyeTrackerProfileProps) => void;
}) => {
  const [data, setData] = useState({ ...eyeTracker });

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-2">
        <Checkbox
          onCheckedChange={(e: boolean) => setData({ ...data, active: !e })}
          checked={!data.active}
          id="disable"
        />
        <Label htmlFor="disable">Disable</Label>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          value={data.description ?? ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
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
          onClick={() => editEyeTrackerProfile({ ...data })}
          type="submit"
        >
          Update
        </Button>
      </DialogFooter>
    </div>
  );
};
