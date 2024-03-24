import React from "react";
import { Wifi, WifiIcon } from "lucide-react";
import { BatteryFullIcon } from "lucide-react";
import { BarChart } from "lucide-react";
import { NavigationIcon } from "lucide-react";

const Header = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (
    <div className="flex items-center justify-between h-10 py-2 px-6">
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

export default Header;
