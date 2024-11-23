import CalibrationModal from "@/components/calibration-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserCalibration from "@/components/user-calibration/user-calibration";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";



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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-end w-full">
        <CalibrationModal />
        <UserCalibration />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.title == "Eye Tracker Experiments" ? "#" : item.link}
            >
              <Card
                className={`min-w-[300px] min-h-[150px] ${
                  item.title == "Eye Tracker Experiments"
                    ? "bg-muted text-muted-foreground"
                    : "hover:bg-secondary"
                } hover:text-secondary-foreground transition-colors duration-200`}
              >
                <CardHeader>
                  <CardTitle
                    className={`flex items-center justify-between ${
                      item.title == "Eye Tracker Experiments"
                        ? "text-muted-foreground"
                        : ""
                    }`}
                  >
                    <p>{item.title}</p>
                    <span>
                      <ExternalLinkIcon size={18} />
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
