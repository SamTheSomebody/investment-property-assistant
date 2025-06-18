import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PropertyData } from "../types";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'
import { useGlobalValues } from "../context/GlobalValuesContext"

const fullConfig = resolveConfig(tailwindConfig)
const darkAccent = fullConfig.theme?.colors?.purple?.["dark"].toString() ?? "#e44b8d"

const propertyGrowthRate = 0.05;

export default function Graph({ data }: { data?: PropertyData | null }) {
  let d = calculatePropertyData(data)
  return (
    <div className="w-full h-full p-4 text-purple">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={d} margin={{ top: 5, right: 5, left: 15, bottom: 15 }}>
          <CartesianGrid stroke={darkAccent} />
          <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -10 }} />
          <YAxis label={{ value: "Net worth ($)", angle: -90, position: "insideLeft", offset: -10 }} />
          <Tooltip />
          <Legend height={40} layout="horizontal" align="center" verticalAlign="top" />
          <Line type="monotone" dataKey="property" stroke="red" name="Property" />
          <Line type="monotone" dataKey="asx" stroke="white" name="ASX" />
          <Line type="monotone" dataKey="inflation" stroke={darkAccent} name="Inflation" />
        </LineChart>
      </ResponsiveContainer>
    </div >
  );
}

function calculatePropertyData(data: PropertyData | null | undefined) {
  const globalContext = useGlobalValues()
  if (!globalContext) return [];
  const global = globalContext.values;
  return Array.from({ length: 31 }, (_, year) => ({
    year: year,
    property: Math.round(global.initalInvestment * Math.pow(1 + propertyGrowthRate, year)),
    inflation: Math.round(global.initalInvestment * Math.pow(1 + global.inflation, year)),
    asx: Math.round(global.initalInvestment * Math.pow(1 + global.asx, year)),
  }));
}


//TODO calculate year on year effects of costs and values
