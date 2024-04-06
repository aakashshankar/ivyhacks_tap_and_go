import { atom } from "jotai";
import type { DateRange } from "@/lib/types";

export const dateJotai = atom<DateRange | undefined>(undefined);
