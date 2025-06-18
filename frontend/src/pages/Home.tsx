import React from "react";
import PropertyCard from "../components/VerticalPropertyCard";
import { PropertyData } from "../types";
import Graph from "../components/Graph";
import { sampleListings } from "../constants"


export default function Home() {
  const [selectedProperty, setSelectedProperty] = React.useState<PropertyData | null>(null);

  return (
    <div className="flex flex-col">
      <div className="flex overflow-x-auto justify-center">
        {sampleListings.map((p, i) => (
          <PropertyCard key={i} data={p} isSelected={selectedProperty === p} onSelect={() => setSelectedProperty(p)} />
        ))}
      </div>
      <div className="z-20 aspect-video h-1/2 m-12
      border border-purple-dark 
      bg-gradient-to-b from-gray-875 to-gray-900
      shadow-2xl">
        {selectedProperty && <Graph data={selectedProperty} />}
      </div>
    </div>
  )
}

