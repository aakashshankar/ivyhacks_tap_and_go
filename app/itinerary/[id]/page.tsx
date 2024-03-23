// app/itinerary/[id]/page.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Map from "@/components/map"

interface ItineraryProps {
  itinerary: {
    id: string;
    destination: string;
    travelStyle: string;
    startDate: string;
    endDate: string;
    locations: { [key: string]: string[] };
    coordinates: { [key: string]: number[][] };
    routes: { [key: string]: any };
  };
}

export default function ItineraryPage({ itinerary }: ItineraryProps) {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(Object.keys(itinerary.locations)[0]);

  const handleEditClick = () => {
    router.push(`/planner/${itinerary.id}/edit`);
  };

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {itinerary.travelStyle} Trip to {itinerary.destination}
        </h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
      <p className="text-lg mb-4">
        {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
        {new Date(itinerary.endDate).toLocaleDateString()}
      </p>
      <div className="flex space-x-4 mb-4">
        {Object.keys(itinerary.locations).map((day) => (
          <button
            key={day}
            className={`px-4 py-2 rounded ${
              day === selectedDay ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleDayClick(day)}
          >
            {new Date(day).toLocaleDateString(undefined, {
              weekday: 'short',
              day: 'numeric',
            })}
          </button>
        ))}
      </div>
      <Map
        // locations={itinerary.locations[selectedDay]}
        // coordinates={itinerary.coordinates[selectedDay]}
        // routes={itinerary.routes[selectedDay]}
      />
    </div>
  );
}