import React from "react";
import { PropertyCosts, PropertyData, PropertyType } from "../types";
import { formatCurrency } from "../utils/format";
import { GlobalValues } from "./ValueTable";
import ValueTable from "./ValueTable";

const ICONS = "material-symbols-outlined text-2xl";
const ICONS_LARGE = "material-symbols-outlined text-6xl";
const animation = "transition-all duration-500 ease-out"

type Properties = {
  data: PropertyData;
  isSelected: boolean;
  onSelect?: () => void;
};

const VerticalPropertyCard: React.FC<Properties> = ({ data, isSelected, onSelect }) => {

  const temp: GlobalValues = {
    interest: 0.045,
    unforeseenCosts: -1000,
    landTax: -975,
    purchaseCosts: 0.07,
    initalInvestment: 120000,
    vacancyRates: 0.02,
    rentalFees: 0.07,
  };

  return (
    <div onClick={onSelect} style={{
      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
    }}>
      <div className={`absolute inset-0 z-0 ${animation} ${isSelected ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: isSelected ? `url(${data.imageUrl || '../default.png'})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      <div className={`relative z-10 p-4 shadow cursor-pointer bg-gradient-to-b overflow-hidden ${animation}
      ${isSelected ? "border-l border-r border-purple" : "border-transparent"}
      ${isSelected ? "from-gray-850/70 to-gray-875/70" : "from-gray-875 to-gray-900 hover:from-gray-850 hover:to-purple-dark"} 
      ${isSelected ? "text-white" : "text-gray-400 hover:text-gray-100"}
      `}>

        <div className="flex text-center">
          <div className="w-14 flex-shrink-0">
            <span className={ICONS_LARGE}>{getPropertyIconName(data.propertyType)}</span>
            <p>{data.bedrooms} <span className={ICONS}>bed</span></p>
            <p>{data.bathrooms} <span className={ICONS}>bathtub</span></p>
            <p>{data.carSpaces} <span className={ICONS}>directions_car</span></p>
            <p>{data.squareMeters} m²</p>
            <br />
            <p className="transform rotate-90 text-2xl whitespace-nowrap">{data.address}, {data.suburb}</p>
          </div>
          <div className={`transition-[flex-basis] overflow-x-hidden ${animation}
          ${isSelected ? "basis-[500px]" : "basis-0"}
      `}>
            <div className="pl-4 text-left whitespace-nowrap">
              <br />
              <ValueTable propertyData={data} globalValues={temp} />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div >
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
    return <div><p>{formatCurrency(midpoint)}</p><p>(±{formatCurrency(range)})</p><p className="text-gray-500">N/A</p></div>;
  }

  let color = "text-yellow-500";
  let percentDiff = ((expectedPrice - midpoint) / midpoint) * 100;

  if (expectedPrice < minPrice) {
    color = "text-green-500";
  } else if (expectedPrice > maxPrice) {
    color = "text-red-500";
  }

  return <div><p>{formatCurrency(midpoint)}</p><p>(±{formatCurrency(range)})</p><p className={color}>{percentDiff.toFixed(2)}%</p></div>;
}

function getTotalCosts(costs: PropertyCosts) {
  return Object.values(costs)
    .filter((v) => typeof v === "number")
    .reduce((sum, val) => sum + (val ?? 0), 0)
}

export default VerticalPropertyCard;
