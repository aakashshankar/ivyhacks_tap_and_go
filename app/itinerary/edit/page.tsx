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
import TravelForm from "@/components/common/travel-form";

interface FormData {
  location: string;
  style: string;
  date: string;
  budget: string;
  companion: string[];
}

const companion = [
  {
    id: "kids",
    label: "Kids",
  },
  {
    id: "seniors",
    label: "Seniors",
  },
];

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
            <p>Adventure Trip</p>
            <p>to New York</p>
          </div>
        </div>
        <Separator className="bg-black/70 my-4" />
        <TravelForm buttonText="Save Plan" />
        <div className="text-sm text-center underline underline-offset-1 mt-3 hover:cursor-pointer">
          Log Out
        </div>
      </div>
    </main>
  );
}
