import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-red-500">Hello World!</div>
      <Button>Hello</Button>
      <Map coordinates={[[39.657325, -4.024902]]} locations={[]} routes={[]}/>
    </main>
  );
}
