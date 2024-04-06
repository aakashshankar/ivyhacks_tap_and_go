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
import type { TripData } from "@/lib/types";

export default function Component({ data }: { data: TripData }) {
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;

    if (viewport.scrollTop > 5) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  // function to get day from itin based on active date
  //
  const getDayFromItin = (activeDate: Date) => {
    const startDate = new Date(data.startDate);
    const dayNumber =
      Math.floor(
        (activeDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
      );
    return data.itineraries[dayNumber];
  };

  const [activeDate, setActiveDate] = useState(new Date(data.startDate));
  const [activeItinerary, setActiveItinerary] = useState(
    getDayFromItin(activeDate),
  );

  const handleDateClick = (date: Date) => {
    setActiveDate(date);
    setActiveItinerary(getDayFromItin(date));
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
          <Map itin={activeItinerary} />
          <div>
            {activeItinerary.locations.map((location, index) => (
              <div key={index}>
                <ItineraryList location={location} label={index} />
                <MoveType />
              </div>
            ))}
          </div>
        </div>
        <Footer isScroll={isScroll} dailyBudget={activeItinerary.dailyBudget!}/>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
