"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { z } from "zod";
import { type DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { SearchIcon, LuggageIcon } from "lucide-react";
import { generatePlan } from "@/lib/actions";
import { BanknoteIcon } from "lucide-react";
import { PlaceKit } from "@placekit/autocomplete-react";
import "@placekit/autocomplete-js/dist/placekit-autocomplete.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "@/components/home/date-picker-with-range";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart } from "lucide-react";
import { NavigationIcon } from "lucide-react";
import { WifiIcon } from "lucide-react";
import { BatteryFullIcon } from "lucide-react";

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
    <main className="relative flex flex-col items-center overflow-y-scroll rounded-t-2xl">
      {/* Background Image with Filters */}
      <div
        className="sepia-30 absolute h-[255px] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/new-york.jpg')",
          filter: "contrast(50%) saturate(40%)",
        }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute left-0 right-0 top-0 h-[255px] rounded-t-2xl bg-gradient-to-b from-[#F7F1BA] via-transparent to-[#F0ECE4]"></div>
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
