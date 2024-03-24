import Link from "next/link";
import React from "react";
import { PencilIcon } from "lucide-react";
import { CalendarDaysIcon } from "lucide-react";
const Header = () => {
  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-xl">
            <p>Adventure Trip</p>
            <p>to New York</p>
          </div>
          <Link href="/itinerary/edit">
            <div className="rounded-full bg-white p-2">
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
    </>
  );
};

export default Header;
