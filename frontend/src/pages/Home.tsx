import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/property/PropertyCard';
import { Property } from '../types/property';
import Graph from '../components/Graph';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/Error';
import { toCamelCaseProperty } from '../utils/propertyMapping';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/properties')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch properties');
        return res.json();
      })
      .then((data) => setProperties(data.map(toCamelCaseProperty)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);
  return (
    <div className="flex-1 flex flex-col p-12 pt-0 overflow-hidden">
      <div className="flex-0 flex overflow-hidden justify-center">
        {loading && <Loading />}
        {error && <ErrorDisplay message={error} />}
        {!loading && !error && properties.map((p, i) => <PropertyCard key={i} property={p} isSelected={selectedProperty === p} onSelect={() => setSelectedProperty(p)} />)}
      </div>
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        <div className="border border-purple-dark bg-gradient-to-b from-gray-875 to-gray-900 shadow-2xl" style={{ height: '100%', width: 'auto', aspectRatio: '16 / 9', maxWidth: '100%' }}>
          <Graph data={selectedProperty} />
        </div>
      </div>
    </div>
  );
}
