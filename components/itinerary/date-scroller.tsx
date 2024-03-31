import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const DateScroller = ({
  fromDate,
  toDate,
  activeDate,
  onDateClick,
}: {
  fromDate: string;
  toDate: string;
  activeDate: Date;
  onDateClick: (date: Date) => void;
}) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const dates = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  return (
    <Carousel className="w-full max-w-sm text-center">
      <CarouselContent className="-ml-2">
        {dates.map((date, index) => (
          <CarouselItem
            key={index}
            className={`pl-6 flex flex-col basis-1/6 cursor-pointer ${
              date.toDateString() === activeDate.toDateString()
                ? "opacity-100"
                : "opacity-50"
            }`}
            onClick={() => onDateClick(date)}
          >
            <p className="font-bold">
              {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
                date,
              )}
            </p>
            <div className="p-2 bg-white rounded-full">
              <p className="font-bold">{date.getDate()}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DateScroller;
