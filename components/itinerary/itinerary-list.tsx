import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { ClockIcon } from "lucide-react";
import { HourglassIcon } from "lucide-react";
import { BanknoteIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import { Itinerary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import { Suggestion } from "./suggestion";

type HeaderProps = {
  itinerary: Itinerary;
  label: number;
};
const ItineraryList = ({ itinerary, label }: HeaderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      {/* Image Animation */}
      <div className="relative">
        {isOpen && (
          <div className="absolute top-4 right-4 p-1 rounded-full bg-white shadow-md">
            <ChevronDownIcon
              className="hover:cursor-pointer w-5 h-5"
              onClick={() => setIsOpen(false)}
            />
          </div>
        )}
        <div
          className={`overflow-hidden transition-[max-height] duration-150 ease-in-out ${
            isOpen ? "max-h-[165px]" : "max-h-0"
          }`}
          style={{ backgroundColor: "lightgray" }}
        >
          <div
            className={`h-[165px] w-full ${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-150`}
          >
            Photo
          </div>
        </div>
      </div>

      <div className="px-3 py-6 bg-white">
        {/* Title */}
        <div className="grid grid-cols-8 gap-2 items-center">
          <div className="col-span-1 flex justify-center">
            <div
              className="bg-[#99BAEC] rounded-full text-center font-bold p-2 flex items-center justify-center text-sm"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              1
            </div>
          </div>
          <div className="col-span-6 text-left font-bold ml-2 text-lg">
            Museum of Modern Art
          </div>

          <div className="col-span-1 flex justify-center">
            {!isOpen && (
              <ChevronDownIcon
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
              <div className="col-start-2 col-span-full flex items-center py-1 mb-2">
                <div>
                  Explore the collections of modern and contemporary art,
                  including works by Van Gogh, Warhol, and Picasso.
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-8 gap-2 font-semibold mt-2">
            <div className="col-start-2 col-span-full flex items-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <p>09:00 am - 06:00 pm</p>
            </div>
          </div>
          {isOpen && (
            <div className="grid grid-cols-8 gap-2 font-semibold">
              <div className="col-start-2 col-span-full flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5" />
                <p>11 W 53rd St, New York, NY 10019</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-8 gap-2 font-semibold">
            <div className="col-start-2 col-span-6 flex justify-between">
              <div className="flex space-x-2">
                <HourglassIcon className="w-5 h-5" />
                <p>3-4 hours</p>
              </div>
              <div className="flex space-x-2 justify-self-end">
                <BanknoteIcon className="w-5 h-5" />
                <p>$25 - $35</p>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion */}
        {isOpen && (
          <>
            <Separator className="my-4" />
            <div className="font-bold text-sm text-gray-700 p-2">
              Recommended places
            </div>
            <div>
              <Suggestion />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ItineraryList;
