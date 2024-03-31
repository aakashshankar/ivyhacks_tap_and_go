"use client";
import { Button } from "@/components/ui/button";
import { type DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { SearchIcon, LuggageIcon } from "lucide-react";
import { generatePlan } from "@/lib/actions";
import { BanknoteIcon } from "lucide-react";

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

interface FormData {
  destination: string;
  style: string;
  date: DateRange;
  startDate: string;
  endDate: string;
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
      destination: "",
      style: "",
      startDate: "",
      endDate: "",
      date: undefined,
      budget: "",
      companion: [],
    },
  });

  const locations = [
    { label: "New York", value: "new york" },
    { label: "Seoul", value: "seoul" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Barcelona", value: "barcelona" },
    { label: "Paris", value: "paris" },
    { label: "Rome", value: "rome" },
    { label: "Istanbul", value: "istanbul" },
    { label: "Sydney", value: "sydney" },
    { label: "Tokyo", value: "tokyo" },
    { label: "Hong Kong", value: "hong kong" },
  ] as const;

  const onSubmit = (data: any) => {
    console.log(form.getValues());
    // generatePlan(...);
  };
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [selectedDate, setSelectedDate] = useAtom<DateRange | undefined>(
    dateJotai,
  );

  useEffect(() => {
    console.log(selectedDate);
    form.setValue("startDate", dateFormatted.format(selectedDate?.from));
    form.setValue("endDate", dateFormatted.format(selectedDate?.to));
  }, [selectedDate]);

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
      <div className="relative z-50 flex h-full w-full flex-col px-6">
        <div className="sticky top-2 z-50 my-4 flex h-10 w-full items-center justify-between px-6">
          <div className="flex items-center space-x-1">
            <p className="text-sm">
              {hours}:{minutes}
            </p>
            <NavigationIcon className="h-3 w-3" fill="black" />
          </div>

          <div className="flex items-center space-x-1">
            <BarChart className="h-5 w-5" />
            <WifiIcon className="h-5 w-5" />
            <BatteryFullIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="text-black] pb-8 pt-24 text-left text-2xl font-bold">
          Plan Your Dream Journey Instantly!
        </div>
        <Form {...form}>
          <form
            action={generatePlan}
            className="w-full space-y-6"
            onSubmit={onSubmit}
          >
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black/80">Where to?</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="New York, NY" {...field} /> */}
                    <div className="relative w-full">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                        <SearchIcon className="h-5 w-5 text-[#2E2E29]" />
                      </div>
                      <Input
                        placeholder="Search a city"
                        className="pl-12"
                        {...field}
                      />
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
                // <FormItem>
                //   <FormLabel>Choose your travel style</FormLabel>
                //   <Select
                //     onValueChange={field.onChange}
                //     defaultValue={field.value}
                //   >
                //     <FormControl>
                //       <SelectTrigger className="w-full relative">
                //         <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                //           <LuggageIcon className="text-[#2E2E29] w-5 h-5" />
                //         </div>
                //         <div className="flex items-center pl-10 pr-4 py-2">
                //           <SelectValue
                //             placeholder="Travel style"
                //             className="placeholder:text-left flex-1"
                //           />
                //         </div>
                //       </SelectTrigger>
                //     </FormControl>
                //     <SelectContent>
                //       <SelectGroup>
                //         <SelectItem value="adventure">
                //           Adventure Travel
                //         </SelectItem>
                //         <SelectItem value="foodie">Foodie Travel</SelectItem>
                //         <SelectItem value="wellness">
                //           Wellness Travel
                //         </SelectItem>
                //         <SelectItem value="accommodation">
                //           Accommodation Focused
                //         </SelectItem>
                //         <SelectItem value="culture">
                //           Cultural Exploration
                //         </SelectItem>
                //         <SelectItem value="slow">Slow Travel</SelectItem>
                //       </SelectGroup>
                //     </SelectContent>
                //   </Select>
                //   <FormMessage />
                // </FormItem>
                <FormItem>
                  <FormLabel>Travel Style</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                        <LuggageIcon className="h-5 w-5 text-[#2E2E29]" />
                      </div>
                      <Input
                        placeholder="Adventure"
                        className="pl-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePickerWithRange className="[&>button]:w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="date"
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
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
                    <div className="relative w-full">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                        <BanknoteIcon className="h-5 w-5 text-[#2E2E29]" />
                      </div>
                      <Input placeholder="500" className="pl-12" {...field} />
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
                                          (value) => value !== item.id,
                                        ),
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
            <div className="w-full flex-1">
              <Button
                className="h-14 w-full bg-[#99BAEC] text-lg text-black hover:bg-[#F2ECA4]"
                type="submit"
              >
                Generate Plan
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
