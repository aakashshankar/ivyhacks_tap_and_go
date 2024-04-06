"use client";

import "@placekit/autocomplete-js/dist/placekit-autocomplete.css";
import { UserButton } from "@clerk/nextjs";

import TravelForm from "@/components/common/travel-form";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";

export default function Home() {
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
      <div className="z-[51] absolute right-6 top-6">
        <ContextMenu>
          <ContextMenuTrigger>
            <UserButton />
          </ContextMenuTrigger>
          <ContextMenuContent className="z-[100]">
            <ContextMenuItem>
              <Link href="/record">Record</Link>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
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
