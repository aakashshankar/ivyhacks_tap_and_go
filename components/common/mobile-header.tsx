import React from "react";
import { Wifi, WifiIcon } from "lucide-react";
import { BatteryFullIcon } from "lucide-react";
import { BarChart } from "lucide-react";
import { NavigationIcon } from "lucide-react";

interface MobileHeaderProps {
  backgroundColor: string;
  isScroll: boolean;
}
const MobileHeader = ({ backgroundColor, isScroll }: MobileHeaderProps) => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Format hours to 2 digits
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Format hours to 2 digits
  return (
    <div
      className={`flex items-center justify-between h-10 ${
        isScroll ? "py-4" : "py-8"
      } px-12 sticky top-0 z-50 rounded-t-2xl ${backgroundColor}`}
    >
      <div className="flex items-center space-x-1">
        <p className="text-sm">
          {hours}:{minutes}
        </p>
        <NavigationIcon className="w-3 h-3" fill="black" />
      </div>

      <div className="flex items-center space-x-1">
        <BarChart className="w-5 h-5" />
        <WifiIcon className="w-5 h-5" />
        <BatteryFullIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default MobileHeader;
