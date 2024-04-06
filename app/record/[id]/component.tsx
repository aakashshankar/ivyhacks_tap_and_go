"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SearchIcon, LuggageIcon, ArrowLeftIcon } from "lucide-react";
import { BanknoteIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "@/components/home/date-picker-with-range";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BatteryFullIcon } from "lucide-react";
import { BarChart } from "lucide-react";
import { NavigationIcon } from "lucide-react";
import { Wifi, WifiIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";

import { dateJotai } from "@/lib/jotai";
import { useAtom } from "jotai";
// import { DateRange } from "react-day-picker";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import type { TripData, UserTripData } from "@/lib/types";

export default function Component({ data }: { data: UserTripData }) {
  console.log("data:>> ", data);
  return (
    <main className="relative flex flex-col items-center rounded-t-2xl overflow-hidden">
      <div className="relative z-50 flex flex-col h-full w-full">
        {/* HEADER */}
        <div className="space-y-4 p-6 mt-4">
          <Link href="/" className="w-fit flex items-center">
            <ArrowLeftIcon className={`w-5 h-5`} />
          </Link>
          <div className="text-2xl text-left font-bold text-black">
            <p>Trip Records</p>
          </div>
        </div>
        <Separator className="bg-black/70 my-4" />
        <Accordion type="single" collapsible className="w-full px-6">
          {data.trips.map((trip, index) => (
            <AccordionItem key={trip.id} value={`item-${trip.id}`}>
              <AccordionTrigger>
                <div className="flex space-x-2">
                  <Image
                    src={`https://flagcdn.com/${trip.countrycode}.svg`}
                    height="8"
                    width="20"
                    alt={trip.countrycode}
                  ></Image>
                  <p>
                    {trip.startDate.replaceAll("-", ".")} -
                    {trip.endDate.replaceAll("-", ".")}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {trip.itineraries.map((it, index) => (
                  <div key={it.id} className="space-y-2 mb-2">
                    <p className="font-semibold underline underline-offset-1">
                      {it.date?.replaceAll("-", ".")}
                    </p>
                    <div className="text-sm">
                      {it.locations.map((loc, index) => (
                        <p key={loc.id}>{loc.locationName}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
