import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { ClockIcon } from "lucide-react";
import { HourglassIcon } from "lucide-react";
import { BanknoteIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import { Itinerary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  itinerary: Itinerary;
  label: number;
};
const ItineraryList = ({ itinerary, label }: HeaderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="px-3 py-6 bg-white">
      {/* Title */}
      <div className="grid grid-cols-8 gap-2">
        <div className="p-1 bg-[#99BAEC] rounded-full text-center font-bold">
          {label + 1}
        </div>
        <div className="col-span-6 text-left font-bold ml-2 text-lg">
          {itinerary.location}
        </div>

        <div className="col-span-1 flex justify-center">
          {isOpen ? (
            <ChevronDownIcon
              className="hover:cursor-pointer w-5 h-5"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <ChevronUpIcon
              className="hover:cursor-pointer w-5 h-5"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        <div className="col-start-2 col-span-full flex items-center py-1 mb-1">
          <Badge
            variant="outline"
            className="text-[#2E2E29] border-[#2E2E29] text-xs font-light"
          >
            Restaurant
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 ml-2 text-sm mt-2">
        {isOpen && (
          <div className="grid grid-cols-8 gap-2 text-gray-700">
            <div className="col-start-2 col-span-full flex items-center py-1">
              <div>{itinerary.activity}</div>
            </div>
          </div>
        )}

        {/* <div className="grid grid-cols-8 gap-2 font-semibold"> */}
        {/*   <div className="col-start-2 col-span-full flex items-center space-x-2"> */}
        {/*     <ClockIcon className="w-5 h-5" /> */}
        {/*     <p>{itinerary.time}</p> */}
        {/*   </div> */}
        {/* </div> */}
        {/*TODO: we should fetch the full address from mapbox and store in db. */}
        {isOpen && (
          <div className="grid grid-cols-8 gap-2 font-semibold">
            <div className="col-start-2 col-span-full flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5" />
              <p>11 W 53rd St, New York, NY 10019</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-8 gap-2 font-semibold">
          <div className="col-start-2 col-span-6 gap-2 flex flex-col justify-between">
            <div className="flex space-x-2">
              <HourglassIcon className="w-5 h-5" />
              <p>{itinerary.time}</p>
            </div>
            <div className="flex space-x-2 justify-self-end">
              <BanknoteIcon className="w-5 h-5" />
              <p>{itinerary.budget}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryList;
