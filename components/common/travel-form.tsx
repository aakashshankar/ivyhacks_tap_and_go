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
import { ClockIcon } from "lucide-react";
import { UserRoundIcon } from "lucide-react";
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

import countryToCurrency, { Currencies, Countries } from "country-to-currency";

import { dateJotai } from "@/lib/jotai";
import { useAtom } from "jotai";
import { useEffect } from "react";

import currencies from "../../data/currency.json";

interface FormData {
  destination: object;
  style: string;
  date: DateRange;
  start: string;
  end: string;
  budget: string;
  travelers: string;
  companion: string[];
}
interface Item {
  administrative: string;
  city: string;
  coordinates: string;
  country: string;
  countrycode: string;
  county?: string;
  highlight: string;
  // lat: any;
  // lng: any;
  name: string;
  population: number;
  type: string;
  zipcode: [];
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

const travelStyles = [
  {
    id: "adventure",
    label: "Adventure Travel",
  },
  {
    id: "foodie",
    label: "Foodie Travel",
  },
  {
    id: "wellness",
    label: "Wellness Travel",
  },
  {
    id: "accommodation",
    label: "Accommodation Focused",
  },
  {
    id: "culture",
    label: "Cultural Exploration",
  },
  {
    id: "slow",
    label: "Slow Travel",
  },
];

interface TravelFormProps {
  buttonText: string;
}

const TravelForm = ({ buttonText }: TravelFormProps) => {
  const formatValue = (item: any) => item.name;

  const [initialDateRange, setInitialDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useAtom(dateJotai);
  const [currency, setCurrency] = useState("$");

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Format hours to 2 digits
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const form = useForm<FormData>({
    defaultValues: {
      destination: {},
      style: "",
      date: initialDateRange,
      start: "",
      end: "",
      budget: "",
      travelers: "",
      companion: [],
    },
  });

  const isCountryCode = (key: any): key is Countries => {
    return key in countryToCurrency;
  };

  const handlePick = useCallback((value: any, item: any) => {
    const countryCode = item.countrycode.toUpperCase();

    if (isCountryCode(countryCode)) {
      const currency = countryToCurrency[countryCode];
      currencies.filter((c) => {
        if (c.abbreviation === currency) {
          setCurrency(c.symbol);
        }
      });
    }

    form.setValue("destination", item);
  }, []);

  const onSubmit = (data: any, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedDate) {
      form.setValue("date", selectedDate);
    }
    console.log(form.getValues());
  };
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Form display the initial date ranged based on the value of selectedDate atom
  useEffect(() => {
    if (selectedDate) {
      setInitialDateRange(selectedDate);
    }
  }, [selectedDate]);
  return (
    <Form {...form}>
      <form
        // action={generatePlan}
        className="w-full space-y-6 px-6 z-50"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          onSubmit(form.getValues(), event)
        }
      >
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where to?</FormLabel>
              <FormControl>
                <PlaceKit
                  apiKey={process.env.NEXT_PUBLIC_PLACE_KIT_API_KEY}
                  options={{
                    types: ["city"],
                    countrySelect: false,
                    formatValue,
                    panel: {
                      className: "",
                      offset: 14,
                      strategy: "absolute",
                      flip: false,
                    },
                  }}
                  placeholder="Search a city"
                  className="!shadow-none !flex !h-11 !w-full !rounded-2xl !border !border-input !bg-background !px-1 !py-2 !text-sm !ring-offset-background !file:border-0 !file:bg-transparent !file:text-sm !file:font-medium !placeholder:text-[#2E2E29] !focus-visible:outline-none !focus-visible:ring-2 !focus-visible:ring-ring !focus-visible:ring-offset-2 !disabled:cursor-not-allowed !disabled:opacity-50"
                  onPick={handlePick}
                />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                      {travelStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.label}
                        </SelectItem>
                      ))}
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
        <div className="flex w-full space-x-4">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <ClockIcon className="w-5 h-5 text-[#2E2E29]" />
                    </div>
                    <Input type="time" className="pl-12 w-full" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <div className="w-full relative ">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <ClockIcon className="w-5 h-5 text-[#2E2E29]" />
                    </div>
                    <Input type="time" className="pl-12 w-full" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full space-x-4">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      {/* <BanknoteIcon className="w-5 h-5 text-[#2E2E29]" /> */}
                      {currency}
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
            name="travelers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travelers</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <UserRoundIcon className="w-5 h-5 text-[#2E2E29]" />
                    </div>
                    <Input placeholder="2" className="pl-12" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                        <FormLabel className="font-normal hover:cursor-pointer">
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
          {/* <Link href="/itinerary" passHref> */}
          <Button
            type="submit"
            className="bg-[#99BAEC] text-black w-full h-12 text-lg hover:bg-[#99BAEC]/90"
          >
            {buttonText}
          </Button>
          {/* </Link> */}
        </div>
      </form>
    </Form>
  );
};

export default TravelForm;
