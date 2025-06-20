import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PropertyData } from "../types";
import { useGlobalValues } from "../context/GlobalValuesContext"
import { formatCurrency } from "../utils/format"

const colors = {
  lightBackground: "#393736",
  background: "#252423",
  darkBackground: "#131313",
  accent: "#7901ff",
}
const propertyGrowthRate = 0.05;

function currency(value: number) {
  return formatCurrency(value, 1)
}

export default function Graph({ data }: { data?: PropertyData | null }) {
  let d = calculatePropertyData(data)
  if (!d || d.length === 0) return null;
  const years = d.map((point) => point.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const ticks: number[] = [];
  for (let y = minYear; y <= maxYear; y += 5) ticks.push(y);

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={d} margin={{ top: 16, right: 16, left: 48, bottom: 32 }}>
        <CartesianGrid stroke={colors.lightBackground} />
        <XAxis dataKey="year" ticks={ticks} label={{ value: "Year", position: "insideBottom", offset: -16 }} />
        <YAxis tickFormatter={currency} label={{ value: "Net worth ($)", angle: -90, position: "insideLeft", offset: -32 }} />
        <Tooltip contentStyle={{
          backgroundColor: colors.darkBackground,
          border: `1px solid ${colors.accent}`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        }}
          labelStyle={{ color: colors.accent }}
          cursor={{ stroke: colors.lightBackground }} />
        <Legend height={40} layout="horizontal" align="center" verticalAlign="top" />
        <Line type="monotone" dataKey="property" stroke="red" name="Property" />
        <Line type="monotone" dataKey="asx" stroke="white" name="ASX" />
        <Line type="monotone" dataKey="inflation" stroke={colors.lightBackground} name="Inflation" />
      </LineChart>
    </ResponsiveContainer >
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
