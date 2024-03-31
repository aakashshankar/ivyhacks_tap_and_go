"use client";
import React, { useState } from "react";
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

export default function Component({ data }: { data: any }) {
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;

    if (viewport.scrollTop > 5) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  const [activeDate, setActiveDate] = useState(new Date(data.startDate));

  const handleDateClick = (date: Date) => {
    setActiveDate(date);
  };
  return (
    <ScrollArea.Root className="h-[844px]">
      <ScrollArea.Viewport className="h-full w-full" onScroll={handleScroll}>
        <MobileHeader isScroll={isScroll} backgroundColor="bg-[#F2ECA4]" />
        <div className="">
          {/* SECOND HEADER SECTION */}
          <div className="sticky left-0 top-10 z-50 space-y-5 bg-[#F2ECA4]">
            <div className={`space-y-3 px-6`}>
              {/* ANIMATION */}
              <Header isScroll={isScroll} data={data} />
            </div>
            <Separator className="bg-black/70" />
            <DateScroller
              fromDate={data.startDate}
              toDate={data.endDate}
              activeDate={activeDate}
              onDateClick={handleDateClick}
            />
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
  );
}
