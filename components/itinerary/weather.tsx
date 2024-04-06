import React from "react";
import { Sun } from "lucide-react";

const Weather = () => {
  return (
    <div className="bg-white shadow-md px-4 py-2 rounded-3xl flex flex-col justify-center items-center">
      <div>Expected</div>
      <div className="flex items-center justify-center space-x-2">
        <Sun className="w-5 h-5" />
        <span className="font-bold">25°C</span>
      </div>
    </div>
  );
};

export default Weather;
