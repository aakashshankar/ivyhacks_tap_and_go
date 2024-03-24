import React, { useState } from "react";
import { Separator } from "../ui/separator";

const Footer = () => {
  const [scroll, setScroll] = useState(0);
  return (
    <>
      <div className="bg-[#F0ECE4] space-y-2 p-4">
        <p>Mon, Mar 25</p>
        <div className="w-full rounded-2xl bg-white py-2 px-4 flex items-center justify-between">
          <p>Schedule</p>
          <p>10:00 am - 08:00 pm</p>
        </div>
        <div className="w-full rounded-2xl bg-white py-2 px-4 flex items-center justify-between">
          <p>Daily Budget</p>
          <p>$ 65</p>
        </div>
      </div>

      <Separator className="bg-black" />
      <div className="p-4 flex space-x-2 justify-center">
        <div className="p-3 flex-1 border border-black rounded-full text-center">
          Regenerate
        </div>
        <div className="p-3 flex-1 border border-black rounded-full text-center">
          Save Plan
        </div>
      </div>
    </>
  );
};

export default Footer;