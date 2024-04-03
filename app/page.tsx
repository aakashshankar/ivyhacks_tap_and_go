"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { z } from "zod";
import { type DateRange } from "react-day-picker";
import { add, format } from "date-fns";
import { useForm } from "react-hook-form";
import { SearchIcon, LuggageIcon } from "lucide-react";
import { PiggyBankIcon } from "lucide-react";
import { generatePlan } from "@/lib/actions";
import { BanknoteIcon } from "lucide-react";
import { PlaceKit } from "@placekit/autocomplete-react";
import "@placekit/autocomplete-js/dist/placekit-autocomplete.css";

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
import { BarChart } from "lucide-react";
import { NavigationIcon } from "lucide-react";
import { Wifi, WifiIcon } from "lucide-react";
import { BatteryFullIcon } from "lucide-react";
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
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

import { dateJotai } from "@/lib/jotai";
import { useAtom } from "jotai";
import { useEffect } from "react";
import TravelForm from "@/components/common/travel-form";

export default function Home() {
  // const locations = [
  //   { label: "New York", value: "new york" },
  //   { label: "Seoul", value: "seoul" },
  //   { label: "Mumbai", value: "mumbai" },
  //   { label: "Barcelona", value: "barcelona" },
  //   { label: "Paris", value: "paris" },
  //   { label: "Rome", value: "rome" },
  //   { label: "Istanbul", value: "istanbul" },
  //   { label: "Sydney", value: "sydney" },
  //   { label: "Tokyo", value: "tokyo" },
  //   { label: "Hong Kong", value: "hong kong" },
  // ] as const;

  return (
    <main className="relative flex flex-col items-center rounded-t-2xl overflow-y-scroll">
      {/* Background Image with Filters */}
      <div
        className="absolute h-[255px] w-full bg-cover bg-center bg-no-repeat sepia-30"
        style={{
          backgroundImage: "url('/assets/images/new-york.jpg')",
          filter: "contrast(50%) saturate(40%)",
        }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-[255px] bg-gradient-to-b from-[#F7F1BA] via-transparent to-[#F0ECE4] rounded-t-2xl"></div>
      {/* HEADER */}
      <div className="relative z-50 flex flex-col h-full w-full px-6">
        <div className="text-2xl text-left py-24 font-bold text-black]">
          Plan Your Dream Journey Instantly!
        </div>
      </div>
      <TravelForm buttonText="Generate Plan" />
    </main>
  );
}
