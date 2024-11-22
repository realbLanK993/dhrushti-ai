"use client"
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/lib/hooks";
import { User } from "@/lib/types/user";
import { Panel } from "@/lib/types/panel";

interface SelectionPopupProps {
  onComplete: (user: string, panel: string) => void;
}

export default function SelectionPopup({ onComplete }: SelectionPopupProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedPanel, setSelectedPanel] = useState<string>("");
    const allUser = useFetch<User[]>(`/user/view/active`);
    const allPanels = useFetch<Panel[]>(`/panel/view/all`);
  useEffect(() => {
    allUser.fetchData();
  }, [allUser.fetchData]);
  useEffect(() => {
    allPanels.fetchData();
  },[allPanels.fetchData])
  useEffect(() => {
      allUser.data && setUsers(allUser.data);
      allPanels.data && setPanels(allPanels.data);
  },[allUser.data, allPanels.data])
  const handleContinue = () => {
    if (selectedUser && selectedPanel) {
      onComplete(selectedUser, selectedPanel);
    }
  };

  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-4">
      <div className="min-w-[400px]">
        <div className="mb-4">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.uid} value={user.uid}>
                  {user.username ?? user.uid}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Select value={selectedPanel} onValueChange={setSelectedPanel}>
            <SelectTrigger>
              <SelectValue placeholder="Select a panel" />
            </SelectTrigger>
            <SelectContent>
              {panels.map((panel) => (
                <SelectItem key={panel.uid} value={panel.uid}>
                  {panel.uid}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleContinue}
          disabled={!selectedUser || !selectedPanel}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
