import React, { useMemo, useRef } from 'react';
import { Property } from '../../types/property';
import { useAdjustableValues } from '../../context/AdjustableValuesContext';
import { calculateInitialPrinciple, calculatePropertyValues, PropertyFinancials } from '../../utils/calculatePropertyFinancials';

export type PropertyFinancialsTableProps = {
  property: Property;
  isSelected: boolean;
};

const softBorderColour = 'border-gray-900/20';
const text = 'text-left px-1';
const number = 'text-right px-1';
const numberPositive = 'bg-green-800/30';
const numberNegative = 'bg-red-800/30';
const mildBorder = `border ${softBorderColour}`;
const noTopBorder = `border border-t-0 border-b border-b-white ${softBorderColour}`;
const hardBorderBottom = 'border-b border-b-white';
const hardBorderRight = `border ${softBorderColour} border-l-0 border-r border-r-white`;

const formatCurrency = (num: number | undefined) => {
  if (num === undefined) {
    return 'N/A';
  }
  if (num == 0) {
    return 'Nil';
  }
  const options = {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  } as const;

  return num.toLocaleString('en-AU', options);
};

type TableRowProps = {
  label: string;
  values: (string | undefined)[];
  hardBorder?: boolean;
  bold?: boolean;
};

const TableRow = ({ label, values, hardBorder, bold }: TableRowProps) => {
  const rowBorderClass = hardBorder ? hardBorderBottom : '';
  const boldClass = bold ? 'font-bold' : '';
  const unlabelledClass = label == '' ? 'italic text-gray-300' : '';

  const getBgClass = (val?: string) => {
    if (!val || label == '') return '';
    if (val.trim().startsWith('-')) return numberNegative;
    if (val.trim().startsWith('$') || val.trim().startsWith('+')) return numberPositive;
    return '';
  };

  return (
    <tr className={`${boldClass} ${unlabelledClass}`}>
      <td className={`${text} ${hardBorderRight} ${rowBorderClass}`}>{label}</td>
      {values.map((val, i) => (
        <td key={i} className={`${number} ${mildBorder} ${rowBorderClass} ${getBgClass(val)}`} style={i === values.length - 1 ? { borderRight: '0' } : undefined}>
          {val || ''}
        </td>
      ))}
    </tr>
  );
};

export default function PropertyFinancialsTable({ property, isSelected }: PropertyFinancialsTableProps) {
  const adjustableValues = useAdjustableValues();
  if (!adjustableValues) return null;

  const lastValuationsRef = useRef<PropertyFinancials[]>([]);

  const valuations = useMemo(() => {
    if (isSelected) {
      const expectedPrice = property.price.expected ?? (property.price.max + property.price.min) / 2;
      const expectedRent = property.rent.expected ?? (property.rent.max + property.rent.min) / 2;
      const minPrinciple = calculateInitialPrinciple(property.price.min, adjustableValues.values);
      const maxPrinciple = calculateInitialPrinciple(property.price.max, adjustableValues.values);
      const expectedPrinciple = calculateInitialPrinciple(expectedPrice, adjustableValues.values);
      const newValuations = [
        calculatePropertyValues(property.price.min, minPrinciple, property.rent.max, property, adjustableValues.values),
        calculatePropertyValues(property.price.max, maxPrinciple, property.rent.min, property, adjustableValues.values),
        calculatePropertyValues(expectedPrice, expectedPrinciple, expectedRent, property, adjustableValues.values),
      ];
      lastValuationsRef.current = newValuations;
      return newValuations;
    } else {
      return lastValuationsRef.current;
    }
  }, [isSelected, property]);

  return (
    <table className="w-full border-collapse text-sm p">
      <thead>
        <tr>
          <th className="border-b border-white" />
          <th className={`${text} ${noTopBorder} border-l border-l-white`}>Best</th>
          <th className={`${text} ${noTopBorder}`}>Worst</th>
          <th className={`${text} ${noTopBorder} border-r-0`}>{`${property.price?.expected === undefined ? 'Valuation' : 'Mean'}`}</th>
        </tr>
      </thead>
      <tbody>
        <TableRow label="Value" values={valuations.map((v) => formatCurrency(v.value))} bold />
        <TableRow label="Initial Principle" values={valuations.map((v) => formatCurrency(v.principle))} bold />
        <TableRow label="Debt" values={valuations.map((v) => formatCurrency(v.debt))} bold hardBorder />
        <TableRow label="Interest" values={valuations.map((v) => formatCurrency(v.interest))} />
        <TableRow label="Strata Fees" values={valuations.map((v) => formatCurrency(v.strataFees))} />
        <TableRow label="Council Rates" values={valuations.map((v) => formatCurrency(v.councilRates))} />
        <TableRow label="Water Rates" values={valuations.map((v) => formatCurrency(v.waterRates))} />
        <TableRow label="Land Tax" values={valuations.map((v) => formatCurrency(v.landTax))} />
        <TableRow label="Home Insurance" values={valuations.map((v) => formatCurrency(v.homeInsurance))} />
        <TableRow label="Rental Insurance" values={valuations.map((v) => formatCurrency(v.landlordInsurance))} />
        <TableRow label="Unforeseen Costs" values={valuations.map((v) => formatCurrency(v.unforeseenCosts))} />
        <TableRow label="Total Costs" values={valuations.map((v) => formatCurrency(v.totalCosts))} hardBorder bold />
        <TableRow label="Rental Yield" values={valuations.map((v) => formatCurrency(v.rent))} />
        <TableRow
          label=""
          values={[formatCurrency((valuations[2]?.rent || 0) / 52) + ' p/w', formatCurrency((valuations[2]?.rent || 0) / 12) + ' p/m', formatCurrency(valuations[2]?.rent || 0) + ' p/a']}
        />
        <TableRow label="Vacancy" values={valuations.map((v) => formatCurrency(v.vacancyCosts))} />
        <TableRow label="Fees" values={valuations.map((v) => formatCurrency(v.rentalFees))} />
        <TableRow label="Total Income" values={valuations.map((v) => formatCurrency(v.totalIncome))} hardBorder bold />
        <TableRow label="Profit/Loss" values={valuations.map((v) => formatCurrency(v.profitLoss))} bold />
        <TableRow label="Net Worth" values={valuations.map((v) => formatCurrency(v.netWorth))} bold />
      </tbody>
    </table>
  );
}
