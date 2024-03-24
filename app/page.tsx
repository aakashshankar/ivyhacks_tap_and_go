"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

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
              <FormItem>
                <FormLabel>Where to?</FormLabel>
                <FormControl>
                  {/* <Input placeholder="New York, NY" {...field} /> */}
                  <Command>
                    <CommandInput placeholder="Search a city" />
                    <CommandList>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>New York</CommandItem>
                        <CommandItem>Seoul</CommandItem>
                        <CommandItem>Mumbai</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
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
                <FormLabel>Select your travel style</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Travel style" />
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
                  <Input placeholder="$100" {...field} />
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
          <div className="flex justify-center">
            <Button type="submit">Generate Plan</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
