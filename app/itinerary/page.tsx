"use client";
import toast, { Toaster } from "react-hot-toast";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import Header from "@/components/itinerary/header";
import MobileHeader from "@/components/common/mobile-header";

import { Separator } from "@/components/ui/separator";
import DateScroller from "@/components/itinerary/date-scroller";
import Map from "@/components/itinerary/map";
import ItineraryList from "@/components/itinerary/itinerary-list";
import MoveType from "@/components/itinerary/move-type";
import Footer from "@/components/itinerary/footer";
// import { ScrollArea } from "@/components/ui/scroll-area";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import Link from "next/link";
export default function Page() {
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;

    if (viewport.scrollTop > 20) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  return (
    <>
      <Toaster />
      <ScrollArea.Root className="h-[940px]">
        <ScrollArea.Viewport className="h-full w-full" onScroll={handleScroll}>
          {/* <MobileHeader isScroll={isScroll} backgroundColor="bg-[#F2ECA4]" /> */}
          <div className="">
            {/* SECOND HEADER SECTION */}
            <div className="bg-[#F2ECA4] sticky left-0 top-0 z-50">
              <div className={`${!isScroll ? "p-6" : "p-4"}`}>
                {/* ANIMATION */}
                <Header isScroll={isScroll} />
              </div>
              <Separator className="bg-black/70" />
              <DateScroller />
              <Separator className="bg-black/70" />
            </div>
            <Map />
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index}>
                  <ItineraryList />
                  <MoveType />
                </div>
              ))}
            </div>
          </div>
          <Footer isScroll={isScroll} />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner />
      </ScrollArea.Root>
    </>
  );
}
