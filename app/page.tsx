import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-red-500">Hello World!</div>
      <Button>Hello</Button>
      <Map coordinates={[[-74.0060, 40.7128]]} locations={[]} routes={[]}/>
    </main>
  );
}
