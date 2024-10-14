"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import {
  AddEyeTrackerExperimentsProps,
  EditEyeTrackerExperimentsProps,
  EyeTrackerExperiment,
} from "@/lib/types/eye-tracker-experiments";

export const EyeTrackerExperimentsForm = ({
  addEyeTrackerExperiment,
}: {
  addEyeTrackerExperiment: (props: AddEyeTrackerExperimentsProps) => void;
}) => {
  const [description, setDescription] = useState("");
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
            addEyeTrackerExperiment({ description: description ?? "" })
          }
          type="submit"
        >
          Start
        </Button>
      </DialogFooter>
    </div>
  );
};

export const EditEyeTrackerExperimentsForm = ({
  editEyeTrackerExperiment,
  experiment,
}: {
  experiment: EyeTrackerExperiment;
  editEyeTrackerExperiment: (props: EditEyeTrackerExperimentsProps) => void;
}) => {
  const [data, setData] = useState({ ...experiment });
  return (
    <div className="flex flex-col gap-4 ">
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
          onClick={() => setData({ ...data, description: "" })}
          variant={"outline"}
        >
          Clear
        </Button>
        <Button
          onClick={() => editEyeTrackerExperiment({ ...data })}
          type="submit"
        >
          Update
        </Button>
      </DialogFooter>
    </div>
  );
};
