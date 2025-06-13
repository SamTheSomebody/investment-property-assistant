import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PropertyData } from "../types";

const base = 120;
const propertyGrowthRate = 0.05;
const asxGrowthRate = 0.09;

export default function Graph(data: PropertyData) {
  let d = calculatePropertyData(data)
  return (
    <div className="w-screen h-full p-4">
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={d} margin={{ top: 5, right: 5, left: 15, bottom: 15 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="2 5" />
          <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -10 }} />
          <YAxis label={{ value: "Value ($)", angle: -90, position: "insideLeft", offset: -10 }} />
          <Tooltip />
          <Legend height={40} layout="horizontal" align="center" verticalAlign="top" />
          <Line type="monotone" dataKey="property" stroke="purple" name="Property ROI" />
          <Line type="asx" dataKey="asx" stroke="red" name="ASX ROI" />
        </LineChart>
      </ResponsiveContainer>
    </div >
  );
}

function calculatePropertyData(data: PropertyData) {
  return Array.from({ length: 31 }, (_, year) => ({
    year,
    property: Math.round(base * Math.pow(1 + propertyGrowthRate, year)),
    asx: Math.round(base * Math.pow(1 + asxGrowthRate, year)),
  }));
}
