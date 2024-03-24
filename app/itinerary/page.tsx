"use client";
import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import Header from "@/components/itinerary/header";
import { Separator } from "@/components/ui/separator";
import DateScroller from "@/components/itinerary/date-scroller";
import Map from "@/components/itinerary/map";
import ItineraryList from "@/components/itinerary/itinerary-list";
import MoveType from "@/components/itinerary/move-type";
import Footer from "@/components/itinerary/footer";
export default function Page() {
  return (
    <>
      <div className="space-y-5">
        <div className="space-y-3 px-6">
          <ArrowLeftIcon className="w-5 h-5" />
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
      <Footer />
    </>
  );
}
