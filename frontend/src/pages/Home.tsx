import React from "react";
import PropertyCard from "../components/VerticalPropertyCard";
import { PropertyData } from "../types";
import Graph from "../components/Graph";
import { sampleListings } from "../constants"


export default function Home() {
  const [selectedProperty, setSelectedProperty] = React.useState<PropertyData | null>(null);

  return (
    <div>

      <div className="h-1/2 flex overflow-x-auto justify-center">
        {sampleListings.map((p, i) => (
          <PropertyCard key={i} data={p} isSelected={selectedProperty === p} onSelect={() => setSelectedProperty(p)} />
        ))}
      </div>
      <div className="z-20 absolute place-self-center inset-x-0 bottom-20 w-3/4 h-2/5
      border border-purple-dark 
      bg-gradient-to-b from-gray-875 to-gray-900
      shadow-2xl">
        {selectedProperty && <Graph data={selectedProperty} />}
      </div>
    </div>
  )
}

