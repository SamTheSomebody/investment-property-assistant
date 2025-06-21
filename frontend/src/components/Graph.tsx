import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Property } from '../types/property';
import { formatCurrency } from '../utils/format';
import { calculateYearlyData } from '../utils/calculateYearlyData';

const colors = {
  lightBackground: '#393736',
  background: '#252423',
  darkBackground: '#131313',
  accent: '#7901ff',
};

function currency(value: number) {
  return formatCurrency(value, 1);
}

export default function Graph({ data }: { data?: Property | null }) {
  let d = calculateYearlyData();
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
        <XAxis tickFormatter={(x) => (x + 2025).toString()} dataKey="year" ticks={ticks} label={{ value: 'Year', position: 'insideBottom', offset: -16 }} />
        <YAxis tickFormatter={currency} label={{ value: 'Net worth ($)', angle: -90, position: 'insideLeft', offset: -32 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.darkBackground,
            border: `1px solid ${colors.accent}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          }}
          labelStyle={{ color: colors.accent }}
          cursor={{ stroke: colors.lightBackground }}
        />
        <Legend height={40} layout="horizontal" align="center" verticalAlign="top" />
        <Line type="monotone" dataKey="property" stroke="red" name="Property" dot={false} />
        <Line type="monotone" dataKey="asx" stroke="white" name="ASX" dot={false} />
        <Line type="monotone" dataKey="inflation" stroke={colors.lightBackground} name="Inflation" dot={false} />
        <Line type="monotone" dataKey="cashRate" stroke={colors.lightBackground} name="Cash Rate" dot={false} />
        <Line type="monotone" dataKey="housePrice" stroke={colors.lightBackground} name="House Price" dot={false} />
        <Line type="monotone" dataKey="unitPrice" stroke={colors.lightBackground} name="Unit Price" dot={false} />
        <Line type="monotone" dataKey="apartmentPrice" stroke={colors.lightBackground} name="Apartment Price" dot={false} />
        <Line type="monotone" dataKey="loan" stroke={colors.lightBackground} name="Lending Rate" dot={false} />
        <Line type="monotone" dataKey="networth" stroke={colors.accent} name="Networth" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
