import React from "react";
import { PropertyCosts, PropertyData } from "../types";
import { formatCurrency } from "../utils/format";

type Properties = {
  data: PropertyData;
};

const PropertyCard: React.FC<Properties> = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-purple-darker to-purple-darkest border-pink rounded-xl p-4 shadow-xl">
      <h2 className="text-lg font-semibold">{data.address}</h2>
      <p className="text-gray-200">{data.suburb} · {data.propertyType}</p>
      <p>{data.bedrooms} 🛏️ · {data.bathrooms} 🛁 · {data.carSpaces} 🚗 · {data.squareMeters} m²</p>
      <div className="grid grid-cols-1">
        <div>💰 {formatPriceRange(data.priceMin, data.priceMax, data.expectedPrice)}</div>
        <div>💵 {formatPriceRange(data.annualRentMin, data.annualRentMax, data.expectedRentalIncome)}</div>
      </div>
      {data.costs && (<div className="text-red">
        <p> Costs: -{formatCurrency(getTotalCosts(data.costs))}</p>
      </div>
      )
      }
    </div >
  );
}

function formatPriceRange(minPrice: number, maxPrice: number, expectedPrice: number | undefined) {
  const midpoint = (minPrice + maxPrice) / 2;
  const range = midpoint - minPrice;

  if (expectedPrice == null) {
    return <span>{formatCurrency(midpoint)} (±{formatCurrency(range)})</span>;
  }

  let color = "text-yellow";
  let percentDiff = ((expectedPrice - midpoint) / midpoint) * 100;

  if (expectedPrice < minPrice) {
    color = "text-red";
  } else if (expectedPrice > maxPrice) {
    color = "text-green-600";
  }

  return <span>{formatCurrency(midpoint)} (±{formatCurrency(range)}) <span className={color}>{percentDiff.toFixed(2)}%</span></span>;
}

function getTotalCosts(costs: PropertyCosts) {
  return Object.values(costs)
    .filter((v) => typeof v === "number")
    .reduce((sum, val) => sum + (val ?? 0), 0)
}

export default PropertyCard;
