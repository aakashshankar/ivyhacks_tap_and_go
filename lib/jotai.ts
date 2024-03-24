import { atom } from "jotai";
import { DateRange } from "react-day-picker";

export const dateJotai = atom<DateRange | undefined>(undefined);
