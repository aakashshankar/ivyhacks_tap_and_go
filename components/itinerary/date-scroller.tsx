import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const DateScroller = () => {
  let days = ["Mon", "Tue", "Wed", "Thu"];
  let dates = ["01", "02", "03", "04"];
  return (
    <Carousel className="w-full max-w-sm text-center py-2">
      <CarouselContent className="-ml-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index} className="pl-6 flex flex-col basis-1/6">
            <p className="font-bold text-sm">{days[index]}</p>
            <div className="p-2 bg-white rounded-full">
              <p className="font-bold text-sm">{dates[index]}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DateScroller;
