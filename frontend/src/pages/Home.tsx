import React from "react";
import PropertyCard from "../components/VerticalPropertyCard";
import { PropertyData } from "../types";
import Graph from "../components/Graph";
import { sampleListings } from "../constants"


export default function Home() {
  const [selectedProperty, setSelectedProperty] = React.useState<PropertyData | null>(null);

  return (
    <div>
      <div className="min-h-1/2 flex overflow-x-auto justify-center">
        {sampleListings.map((p, i) => (
          <PropertyCard key={i} data={p} isSelected={selectedProperty === p} onSelect={() => setSelectedProperty(p)} />
        ))}
      </div>
      {selectedProperty && <Graph data={selectedProperty} />}
    </div>
  )
}

