import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserCalibration from "@/components/user-calibration/user-calibration";
import { ChartNoAxesCombined, ExternalLinkIcon, FlaskConical } from "lucide-react";
import Link from "next/link";
import Cameras from "./cameras/page";
import SimpleCameraTable from "@/components/form/camera/simple";
import { Rightbar } from "@/components/layout/rightbar";
import { FakeChart } from "@/components/form/fake-chart";



export default async function DashboardPage() {
  const tables = [
    {
      title: "Cameras",
      link: "dashboard/cameras",
    },
    {
      title: "Panels",
      link: "dashboard/panels",
    },
    {
      title: "Eye Tracker Profiles",
      link: "dashboard/eye-tracker",
    },
    {
      title: "Users",
      link: "dashboard/users",
    },
    {
      title: "Eye Tracker Experiments",
      link: "dashboard/eye-tracker-experiments",
    },
  ];
  return (
    <div className="flex w-full flex-1 overflow-hidden max-h-screen">
      <div className="flex flex-col gap-8 w-full  px-8 pt-24">
        <div className="">
          <p className="text-4xl font-[500]">Dashboard</p>
          <p className="pl-1">Hi Manish. Have a nice day at work! 👋</p>
        </div>
        <div className="flex flex-col gap-4 pb-4 w-full overflow-auto">
          <SimpleCameraTable />
          <SimpleCameraTable />
          <SimpleCameraTable />
          <SimpleCameraTable />
        </div>
      </div>
      <div className="p-8 w-full max-w-[500px] relative border-l border-gray-200 overflow-hidden">
        <div className="absolute inset-0 p-6 flex flex-col justify-between items-center">
          <div className="flex flex-col justify-center gap-4 items-center py-12">
            {/* <div className="p-16 border hover:text-primary-foreground transition-colors duration-300 hover:bg-primary rounded-full w-fit">
            <ChartNoAxesCombined size={40} />
          </div> */}
            <p className="sticky top-0">Your uptime this month</p>
            <div>
              <p className="text-8xl font-bold text-center">98.5%</p>
              <span className="text-gray-400 text-center w-full block text-sm hover:underline cursor-pointer">
                See more ↗
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="border-2 border-green-700 hover:bg-green-700 text-foreground hover:text-white p-4 px-8 rounded-xl flex gap-2 justify-center items-center">
              <FlaskConical /> Start Eye Tracker Experiment
            </button>
          </div>
          <FakeChart />
        </div>
      </div>
    </div>
  );
}
