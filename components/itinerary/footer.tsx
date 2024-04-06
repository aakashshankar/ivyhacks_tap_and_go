import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { ClockIcon, PencilIcon } from "lucide-react";
import { HourglassIcon } from "lucide-react";
import { BanknoteIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface FooterProps {
  isScroll: boolean;
  dailyBudget: number;
}
const Footer = ({ isScroll, dailyBudget }: FooterProps) => {
  return (
    <div
      className={`sticky bottom-0 z-50 bg-[#F0ECE4] ${
        isScroll && "rounded-t-2xl border-t-1 border-black"
      }`}
    >
      {!isScroll ? (
        <div className="space-y-2 p-4">
          <div className="flex justify-between items-center">
            <p>Mon, Mar 25</p>
            {/* <div className="rounded-full bg-white p-1 shadow-md">
              <PencilIcon className="w-4 h-4" />
            </div> */}
          </div>
          <div className="w-full rounded-2xl bg-white py-2 px-4 flex items-center justify-between">
            <p>Schedule</p>
            <p>10:00 am - 08:00 pm</p>
          </div>
          <div className="w-full rounded-2xl bg-white py-2 px-4 flex items-center justify-between">
            <p>Daily Budget</p>
            <p>$ {dailyBudget}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2 p-4  ">
          <div className="flex justify-between items-center">
            <p>Mon, Mar 25</p>
            {/* <div className="rounded-full bg-white p-1 shadow-md">
              <PencilIcon className="w-4 h-4" />
            </div> */}
          </div>
          <div className="w-full rounded-2xl bg-white py-2 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <p>09:00 am - 06.00 pm</p>
            </div>
            <div className="flex space-x-2 justify-self-end">
              <BanknoteIcon className="w-5 h-5" />
              <p>$25 - $35</p>
            </div>
          </div>
        </div>
      )}

      <Separator className="bg-black" />
      <div className="p-4 flex space-x-2 justify-center">
        <div className="p-3 flex-1 border border-black rounded-full text-center hover:cursor-pointer hover:bg-[#F2ECA4] hover:border-[#F2ECA4]">
          Regenerate
        </div>
        <div
          onClick={() => toast.success("Successfully saved!")}
          className="p-3 flex-1 rounded-full text-center bg-[#99BAEC] hover:cursor-pointer hover:bg-[#99BAEC]/90"
        >
          Save Plan
        </div>
      </div>
    </div>
  );
};

export default Footer;
