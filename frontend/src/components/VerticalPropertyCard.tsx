import React from "react";
import { PropertyCosts, PropertyData, PropertyType } from "../types";
import ValueTable from "./ValueTable";

const ICONS = "material-symbols-outlined text-2xl";
const ICONS_LARGE = "material-symbols-outlined text-6xl";

type Properties = {
  data: PropertyData;
  isSelected: boolean;
  onSelect?: () => void;
};

const VerticalPropertyCard: React.FC<Properties> = ({ data, isSelected, onSelect }) => {
  return (
    <div onClick={onSelect} className="relative h-full" style={{
      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
    }}>
      <div className={`absolute inset-0 z-0 transistion-all duration-1000 delay-300 blur-md ${isSelected ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${data.imageUrl || '../default.png'})`, backgroundSize: 'cover', backgroundPosition: 'center bottom', }}
      />
      <div className={`relative z-10 p-4 shadow cursor-pointer bg-gradient-to-b overflow-hidden transition-default
      ${isSelected ? "border-l border-r border-purple" : "border-transparent"}
      ${isSelected ? "from-gray-850 to-gray-875/80" : "from-gray-875 to-gray-900 hover:from-gray-850 hover:to-purple-dark"} 
      ${isSelected ? "text-white" : "text-gray-400 hover:text-gray-100"}
      `}>
        <div className="flex">
          <div className="flex flex-col justify-start w-14 text-centerr">
            <span className={ICONS_LARGE}>{getPropertyIconName(data.propertyType)}</span>
            <p className="flex items-center justify-evenly">{data.bedrooms} <span className={ICONS}>bed</span></p>
            <p className="flex items-center justify-evenly">{data.bathrooms} <span className={ICONS}>bathtub</span></p>
            <p className="flex items-center justify-evenly">{data.carSpaces} <span className={ICONS}>directions_car</span></p>
            <p className="flex items-center justify-evenly py-1">{data.squareMeters}m²</p>
            <br />
            <h2 className="transform rotate-90 text-2xl text-shadow-lg/30 whitespace-nowrap">{data.address}, {data.suburb}</h2>
          </div>
          <div className={`transition-[flex-basis] overflow-x-hidden transition-default ${isSelected ? "basis-[500px]" : "basis-0"}`}>
            <div className="pl-4 text-left whitespace-nowrap">
              <br />
              <ValueTable propertyData={data} />
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

export default VerticalPropertyCard;
