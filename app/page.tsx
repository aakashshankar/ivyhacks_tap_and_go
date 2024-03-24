"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { type DateRange } from "react-day-picker";
import { add, format } from "date-fns";

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
import { toast } from "@/components/ui/use-toast";
import DatePickerWithRange from "@/components/home/date-picker-with-range";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  location: string;
  style: string;
  from: Date;
  to: Date;
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
  const form = useForm<FormData>({
    defaultValues: {
      location: "",
      style: "",
      from: new Date(),
      to: new Date(),
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
    console.log(data);
  };

  const [dateRange, setDateRange] = useState<DateRange>();

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    console.log("Date Range:", range);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="text-2xl text-center py-8">Plan your trip</div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Where to?</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? locations.find(
                              (location) => location.value === field.value,
                            )?.label
                          : "Select location"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search location..." />
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {locations.map((location) => (
                            <CommandItem
                              value={location.label}
                              key={location.value}
                              onSelect={() => {
                                form.setValue("location", location.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  location.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {location.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Style</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="adventure">
                          Adventure and Thrill
                        </SelectItem>
                        <SelectItem value="foodie">Best Food</SelectItem>
                        <SelectItem value="wellness">
                          Wellness and Relaxation
                        </SelectItem>
                        <SelectItem value="leisure">Leisure Time</SelectItem>
                        <SelectItem value="budget">Tight Budget</SelectItem>
                        <SelectItem value="hotel">Lavish Hotel</SelectItem>
                        <SelectItem value="culture">Culture-Focused</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="date" */}
          {/*   render={({ field }) => ( */}
          {/*     <FormItem> */}
          {/*       <FormLabel>Date</FormLabel> */}
          {/*       <FormControl> */}
          {/*         <DatePickerWithRange */}
          {/*           className="[&>button]:w-full" */}
          {/*           onDateRangeChange={handleDateRangeChange} */}
          {/*         /> */}
          {/*       </FormControl> */}
          {/*       <FormMessage /> */}
          {/*     </FormItem> */}
          {/*   )} */}
          {/* /> */}
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < form.getValues("from") ||
                        date > add(new Date(), { days: 16 })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget ($)</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
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
                          className="flex flex-row items-start space-x-3 space-y-0"
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
          <div className="flex justify-center">
            <Button type="submit">Generate Plan</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
