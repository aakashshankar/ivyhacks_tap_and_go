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
import { DateRange } from "react-day-picker";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
  return (
    <main className="relative flex flex-col items-center rounded-t-2xl overflow-hidden">
      <div className="relative z-50 flex flex-col h-full w-full">
        {/* HEADER */}
        <div className="space-y-4 p-6 mt-4">
          <Link href="/itinerary" className="w-fit flex items-center">
            <ArrowLeftIcon className={`w-5 h-5`} />
          </Link>
          <div className="text-2xl text-left font-bold text-black">
            <p>Trip Records</p>
          </div>
        </div>
        <Separator className="bg-black/70 my-4" />
        <Accordion type="single" collapsible className="w-full px-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <AccordionItem value={`item-${index + 1}`}>
              <AccordionTrigger>2024.04.04 - 2024.05.12</AccordionTrigger>
              <AccordionContent>
                <div>
                  <ul className="!list-disc flex flex-col space-y-1">
                    <li>
                      Now this is a story all about how, my life got
                      flipped-turned upside down
                    </li>
                    <li>
                      Now this is a story all about how, my life got
                      flipped-turned upside down
                    </li>
                    <li>
                      Now this is a story all about how, my life got
                      flipped-turned upside down
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
