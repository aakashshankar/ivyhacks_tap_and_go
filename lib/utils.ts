import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateFromStart(startDate: Date, day: string): Date {
  const dayNumber = day.split("_")[1];
  const newDate = new Date(startDate);
  newDate.setDate(startDate.getDate() + parseInt(dayNumber, 10));
  return newDate;
}

// Helper function to form time ranges
export const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);