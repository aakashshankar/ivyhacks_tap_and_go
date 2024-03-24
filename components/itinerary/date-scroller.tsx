import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const DateScroller = () => {
  return (
    <Carousel className="w-full max-w-sm text-center">
      <CarouselContent className="-ml-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-6 flex flex-col basis-1/6">
            <p className="font-bold">Mon</p>
            <div className="p-2 bg-white rounded-full">
              <p className="font-bold">{index + 1}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DateScroller;
