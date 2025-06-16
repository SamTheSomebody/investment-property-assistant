import React from "react";
import { PropertyCosts, PropertyData } from "../types";
import { formatCurrency } from "../utils/format";

type Properties = {
  data: PropertyData;
  isSelected: boolean;
  onSelect?: () => void;
};

//const [isFocused, setIsFocused] = useState(false);

const PropertyCard: React.FC<Properties> = ({ data, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="border-2 p-4 transition duration-300 cursor-pointer 
      bg-gradient-to-b from-gray-875 to-gray-900 hover:from-purple hover:to-purple-dark
      text-gray-200  hover:text-gray-100
      border-purple-dark hover:border-purple-light
      rounded-s hover:rounded-xl
      shadow hover:shadow-xl
      transform hover:-translate-y-1 hover:scale-105
      ${isSelected ? 'ring-2 ring-yellow-500' : ''}" >
      <h2 className="text-lg font-semibold">{data.address}</h2>
      <p>{data.suburb} · {data.propertyType}</p>
      <p>{data.bedrooms} 🛏️ · {data.bathrooms} 🛁 · {data.carSpaces} 🚗 · {data.squareMeters} m²</p>
      <div className="grid grid-cols-1">
        <div>💰 {formatPriceRange(data.priceMin, data.priceMax, data.expectedPrice)}</div>
        <div>💵 {formatPriceRange(data.annualRentMin, data.annualRentMax, data.expectedRentalIncome)}</div>
      </div>
      {
        data.costs && (<div className="text-red-700">
          <p>-{formatCurrency(getTotalCosts(data.costs))}</p>
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

  let color = "text-yellow-700";
  let percentDiff = ((expectedPrice - midpoint) / midpoint) * 100;

  if (expectedPrice < minPrice) {
    color = "text-green-700";
  } else if (expectedPrice > maxPrice) {
    color = "text-red-700";
  }

  return <span>{formatCurrency(midpoint)} (±{formatCurrency(range)}) <span className={color}>{percentDiff.toFixed(2)}%</span></span>;
}

function getTotalCosts(costs: PropertyCosts) {
  return Object.values(costs)
    .filter((v) => typeof v === "number")
    .reduce((sum, val) => sum + (val ?? 0), 0)
}

export default PropertyCard;
