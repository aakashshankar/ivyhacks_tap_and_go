"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SearchIcon, LuggageIcon } from "lucide-react";
import { PiggyBankIcon } from "lucide-react";

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
import { Wifi, WifiIcon } from "lucide-react";
import { BatteryFullIcon } from "lucide-react";
import { BarChart } from "lucide-react";
import { NavigationIcon } from "lucide-react";
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
import Header from "@/components/common/header";

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

export default function Home() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Format hours to 2 digits
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const form = useForm<FormData>({
    defaultValues: {
      location: "",
      style: "",
      date: "",
      budget: "",
      companion: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // generatePlan(...);
  };

  return (
    <main className="relative flex flex-col items-center rounded-t-2xl overflow-hidden">
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
        <div className="flex items-center justify-between h-10 my-4 px-6 sticky top-2 z-50 w-full">
          <div className="flex items-center space-x-1">
            <p className="text-sm">
              {hours}:{minutes}
            </p>
            <NavigationIcon className="w-3 h-3" fill="black" />
          </div>

          <div className="flex items-center space-x-1">
            <BarChart className="w-5 h-5" />
            <WifiIcon className="w-5 h-5" />
            <BatteryFullIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl text-left pt-24 pb-8 font-bold text-black]">
          Plan Your Dream Journey Instantly!
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black/80">Where to?</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="New York, NY" {...field} /> */}
                    <div className="w-full relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <SearchIcon className="w-5 h-5 text-[#2E2E29]" />
                      </div>
                      <Input placeholder="Search a city" className="pl-12" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose your travel style</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <LuggageIcon className="text-[#2E2E29] w-5 h-5" />
                        </div>
                        <div className="flex items-center pl-10 pr-4 py-2">
                          <SelectValue
                            placeholder="Travel style"
                            className="placeholder:text-left flex-1"
                          />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="adventure">
                            Adventure Travel
                          </SelectItem>
                          <SelectItem value="foodie">Foodie Travel</SelectItem>
                          <SelectItem value="wellness">
                            Wellness Travel
                          </SelectItem>
                          <SelectItem value="accommodation">
                            Accommodation Focused
                          </SelectItem>
                          <SelectItem value="culture">
                            Cultural Exploration
                          </SelectItem>
                          <SelectItem value="slow">Slow Travel</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePickerWithRange className="[&>button]:w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <div className="w-full relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <PiggyBankIcon className="w-5 h-5 text-[#2E2E29]" />
                      </div>
                      <Input placeholder="500" className="pl-12" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companion"
              render={() => (
                <FormItem>
                  <FormLabel>Companion</FormLabel>
                  {companion.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="companion"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 py-1"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
            <div className="flex-1 w-full">
              <Link href="/itinerary" passHref>
                <Button className="bg-[#99BAEC] text-black w-full h-14 text-lg hover:bg-[#F2ECA4]">
                  Generate Plan
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
