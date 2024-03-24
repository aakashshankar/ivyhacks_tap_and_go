import React from "react";
import MapComponent from "../map";

const Map = () => {
  return (
    <div className="border w-full bg-white">
      <MapComponent
        locations={["Eiffel Tower", "Champs-Élysées", "Montmartre"]}
        coordinates={[
          [2.3450015, 48.855382000000006],
          [2.335103333404541, 48.86268650746155],
          [2.307014, 48.868414],
        ]}
        routes={{}}
      />
    </div>
  );
};

export default Map;
