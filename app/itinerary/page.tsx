"use client";
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

    if (viewport.scrollTop > 5) {
      console.log("SCROLL");
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  return (
    <ScrollArea.Root className="h-[844px]">
      <ScrollArea.Viewport className="h-full w-full" onScroll={handleScroll}>
        <MobileHeader isScroll={isScroll} backgroundColor="bg-[#F2ECA4]" />
        <div className="border-2 ">
          {/* SECOND HEADER SECTION */}
          <div className="space-y-5 bg-[#F2ECA4]">
            <div className="space-y-3 px-6">
              <Link href="/">
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <Header />
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
        <Footer />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
