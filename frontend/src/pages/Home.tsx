import React from "react";
import PropertyCard from "../components/VerticalPropertyCard";
import { PropertyData } from "../types";
import Graph from "../components/Graph";
import { sampleListings } from "../constants"


export default function Home() {
  const [selectedProperty, setSelectedProperty] = React.useState<PropertyData | null>(null);
  return (
    <div className="flex-1 flex flex-col p-12 pt-0">
      <div className="flex-0 flex overflow-x-auto justify-center">
        {sampleListings.map((p, i) => (
          <PropertyCard key={i} data={p} isSelected={selectedProperty === p} onSelect={() => setSelectedProperty(p)} />
        ))}
      </div>
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        <div className="border border-purple-dark bg-gradient-to-b from-gray-875 to-gray-900 shadow-2xl"
          style={{ height: '100%', width: 'auto', aspectRatio: '16 / 9', maxWidth: '100%', }}
        >
          <Graph data={selectedProperty} />
        </div>
      </div>
    </div>
  )
}

