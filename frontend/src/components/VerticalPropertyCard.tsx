import React from "react";
import { PropertyCosts, PropertyData, PropertyType } from "../types";
import { formatCurrency } from "../utils/format";

const ICONS = "material-symbols-outlined text-2xl";
const ICONS_LARGE = "material-symbols-outlined text-6xl";
const gradientMask = {
  maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
};
const selectedGradientMask = {
  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
};

type Properties = {
  data: PropertyData;
  isSelected: boolean;
  onSelect?: () => void;
};

const VerticalPropertyCard: React.FC<Properties> = ({ data, isSelected, onSelect }) => {
  return (
    <div onClick={onSelect}
      className={`p-4 shadow transition-all duration-300 ease-in-out cursor-pointer bg-gradient-to-b
      ${isSelected ? "border-l border-r border-purple" : ""}
      ${isSelected ? "from-gray-850 to-gray-875" : "from-gray-875 to-gray-900 hover:from-gray-850 hover:to-purple-dark"} 
      ${isSelected ? "text-white" : "text-gray-400 hover:text-gray-100"}
      `}
      style={isSelected ? selectedGradientMask : gradientMask}>
      <div className="justify-center text-center flex">
        <div className="w-14">
          <span className={ICONS_LARGE}>{getPropertyIconName(data.propertyType)}</span>
          <p>{data.bedrooms} <span className={ICONS}>bed</span></p>
          <p>{data.bathrooms} <span className={ICONS}>bathtub</span></p>
          <p>{data.carSpaces} <span className={ICONS}>directions_car</span></p>
          <p>{data.squareMeters} m²</p>
          <br />
          <p className="transform rotate-90 text-2xl whitespace-nowrap p-2">{data.address}</p>
        </div>
        <div className={`"text-left pl-4 flex-1 transition-all duration-300 ease-in-out" ${isSelected ? "scale-x-100" : "scale-x-0"}`}>
          <p>{data.address}</p>
          <p>{data.suburb}</p>
          <p>{propertyCosts(data)}</p>
        </div>
      </div >
    </div >
  );
}

function propertyCosts(data: PropertyData) {
  return (
    <div className="text-darkgray-500" >
      <hr></hr>
      <div>{formatPriceRange(data.priceMin, data.priceMax, data.expectedPrice)}</div>
      <hr></hr>
      <div>{formatPriceRange(data.annualRentMin, data.annualRentMax, data.expectedRentalIncome)}</div>
      {
        data.costs && (<div className="text-red-700">
          <hr></hr>
          <p>-{formatCurrency(getTotalCosts(data.costs))}</p>
        </div>
        )
      }
    </div >
  );
}

function getPropertyIconName(propertyType: PropertyType): string {
  switch (propertyType) {
    case "House":
      return "house";
    case "Apartment":
      return "apartment";
    case "Townhouse":
      return "holiday_village";
    default:
      return "question_mark"
  }
}

function formatPriceRange(minPrice: number, maxPrice: number, expectedPrice: number | undefined) {
  const midpoint = (minPrice + maxPrice) / 2;
  const range = midpoint - minPrice;

  if (expectedPrice == null) {
    return <div><p>{formatCurrency(midpoint)}</p><p>(±{formatCurrency(range)})</p><br></br></div>;
  }

  let color = "text-yellow-700";
  let percentDiff = ((expectedPrice - midpoint) / midpoint) * 100;

  if (expectedPrice < minPrice) {
    color = "text-green-700";
  } else if (expectedPrice > maxPrice) {
    color = "text-red-700";
  }

  return <div><p>{formatCurrency(midpoint)}</p><p>(±{formatCurrency(range)})</p><p className={color}>{percentDiff.toFixed(2)}%</p></div>;
}

function getTotalCosts(costs: PropertyCosts) {
  return Object.values(costs)
    .filter((v) => typeof v === "number")
    .reduce((sum, val) => sum + (val ?? 0), 0)
}

export default VerticalPropertyCard;
