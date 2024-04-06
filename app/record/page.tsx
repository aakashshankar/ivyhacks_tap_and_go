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
              <AccordionTrigger>
                <div className="flex space-x-2">
                  <Image
                    src="https://flagcdn.com/ua.svg"
                    height="8"
                    width="20"
                    alt="Ukraine"
                  ></Image>
                  <p>2024.04.04 - 2024.05.12</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex flex-col space-y-1">
                    <div className="font-semibold">2024.04.04</div>
                    <ul className="text-sm list-disc">
                      <li>The Metropolitan Museum of Art</li>
                      <li>The Metropolitan Museum of Art</li>
                      <li>The Metropolitan Museum of Art</li>
                    </ul>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="font-semibold">2024.04.04</div>
                    <div className="text-sm">
                      The Metropolitan Museum of Art
                    </div>
                    <div className="text-sm">
                      The Metropolitan Museum of Art
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="font-semibold">2024.04.04</div>
                    <div className="text-sm">
                      The Metropolitan Museum of Art
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
