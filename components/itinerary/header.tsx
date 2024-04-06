import Link from "next/link";
import React from "react";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import type {TripData} from "@/lib/types"
import { CalendarDaysIcon } from "lucide-react";
interface HeaderProps {
  isScroll: boolean;
  data: TripData;
}
const Header = ({ isScroll, data }: HeaderProps) => {
  const { travelStyle, city, startDate, endDate, overallBudget } = data;
  return (
    <div
      className={`${isScroll && "flex justify-between items-center w-full"}`}
    >
      <Link href="/" className="w-fit flex items-center">
        <ArrowLeftIcon className={`w-5 h-5 ${!isScroll && "mb-4"}`} />
        {isScroll && (
          <p className="text-lg w-full pl-3">Adventure Trip to Paris</p>
        )}
      </Link>
      {isScroll && (
        <Link href="/itinerary/edit">
          <div className="rounded-full bg-white p-2 shadow-md">
            <PencilIcon className="w-4 h-4" />
          </div>
        </Link>
      )}
      {!isScroll && (
        <div className="space-y-4">
          <section>
            <div className="flex items-center justify-between">
              <div className="flex flex-col text-xl">
                <p>{travelStyle} Trip</p>
                <p>to {city}</p>
              </div>
              <Link href="/itinerary/edit">
                <div className="rounded-full bg-white p-2 shadow-md">
                  <PencilIcon className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </section>
          <section className="flex items-center justify-between">
            <div className="flex space-x-2">
              <CalendarDaysIcon className="w-5 h-5" />
              <p>
                {startDate} - {endDate}
              </p>
            </div>
            <p>$ {overallBudget}</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Header;
