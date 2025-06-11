import React from "react";
import { PropertyData } from "../types";

type Properties = {
  data: PropertyData;
};

const PropertyCard: React.FC<Properties> = ({data}) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-lg font-semibold">{data.address}</h2>
      <p className="text-gray-600">{data.suburb} · {data.propertyType}</p>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>🛏️ Bedrooms: {data.bedrooms}</div>
        <div>🛁 Bathrooms: {data.bathrooms}</div>
        <div>🚗 Car spaces: {data.carSpaces}</div>
        <div>📏 Area: {data.squareMeters} m²</div>
        <div>💰 Price: ${data.priceMin.toLocaleString()} – ${data.priceMax.toLocaleString()}</div>
        {data.expectedPrice && <div>📈 Expected Price: ${data.expectedPrice.toLocaleString()}</div>}
        {data.expectedRentalIncome && <div>🏠 Expected Rent: ${data.expectedRentalIncome.toLocaleString()}</div>}
        {data.annualRentalIncome && <div>📅 Annual Rent: ${data.annualRentalIncome.toLocaleString()}</div>}
      </div>

      {data.costs && (
        <div className="mt-4 text-sm text-gray-700">
          <h3 className="font-semibold mb-1">Costs:</h3>
          <ul className="list-disc list-inside space-y-0.5">
            {Object.entries(data.costs).map(([key, value]) =>
              value !== undefined ? (
                <li key={key}>
                  {key.replace(/([A-Z])/g, " $1")}: ${value.toLocaleString()}
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
