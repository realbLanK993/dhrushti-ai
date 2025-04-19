"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/lib/hooks";
import { Controller } from "@/lib/types/controller";
import { useState } from "react";

export function ControllerForm({
  setControllers,
}: {
  setControllers: React.Dispatch<React.SetStateAction<Controller[]>>;
}) {
  const [open, setOpen] = useState(false);
  const { fetchData, loading } = useFetch<Controller>("/controller/add");

  const [formData, setFormData] = useState({
    manufacturer: "digilent" as const,
    serialNumber: "123456789",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchData({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setControllers((prev) => [
        ...prev,
        {
          ...formData,
          uid: (prev.length + 1).toString(), // Temporary UID, replace with actual server response if available
          createdTimestamp: new Date().toISOString(),
        },
      ]);
      setOpen(false);
      setFormData({
        manufacturer: "digilent",
        serialNumber: "123456789",
      });
    } catch (err) {
      console.error("Error adding controller:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Controller</Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Controller</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Select value={formData.manufacturer} disabled>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digilent">digilent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Select value={formData.serialNumber} disabled>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="123456789">123456789</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
