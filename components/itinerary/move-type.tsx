import { BusFrontIcon, CarFrontIcon, FootprintsIcon } from "lucide-react";
import React from "react";

const MoveType = () => {
  return (
    <div className="!bg-[#F0ECE4]/90 py-2 mx-auto flex justify-center items-center space-x-3 text-xs">
      <div className="flex space-x-2 text-[#2E2E29] items-center justify-center">
        <FootprintsIcon className="w-5 h-5" />
        <p>10 min</p>
      </div>
      <div className="flex space-x-2 text-[#2E2E29]">
        <BusFrontIcon className="w-5 h-5" />
        <p>10 min</p>
      </div>
      <div className="flex space-x-2 text-[#2E2E29]">
        <CarFrontIcon className="w-5 h-5" />
        <p>10 min</p>
      </div>
    </div>
  );
};

export default MoveType;
