import Link from "next/link";
import React from "react";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { CalendarDaysIcon } from "lucide-react";
interface HeaderProps {
  isScroll: boolean;
}
const Header = ({ isScroll }: HeaderProps) => {
  return (
    <div>
      <Link href="/" className="w-fit flex items-center">
        <ArrowLeftIcon className={`w-5 h-5 ${!isScroll && "mb-2"}`} />
        {isScroll && (
          <p className="text-lg w-full pl-3">Adventure Trip to New York</p>
        )}
      </Link>
      {!isScroll && (
        <div className=" space-y-2">
          <section>
            <div className="flex items-center justify-between">
              <div className="flex flex-col text-xl">
                <p>Adventure Trip</p>
                <p>to New York</p>
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
              <p>Mon, Mar 25 - Tue, Apr 2</p>
            </div>
            <p>$ 500</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Header;
