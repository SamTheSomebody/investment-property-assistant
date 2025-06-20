import React from "react";
import { GlobalValues, PropertyCosts, PropertyData, PropertyType } from "../types";
import { useGlobalValues } from "../context/GlobalValuesContext"

export type PropertyTableProps = {
  propertyData: PropertyData;
};

const softBorderColour = "border-gray-900/20"
const text = "text-left px-1";
const number = "text-right px-1";
const numberPositive = "bg-green-800/30";
const numberNegative = "bg-red-800/30";
const mildBorder = `border ${softBorderColour}`;
const noTopBorder = `border border-t-0 border-b border-b-white ${softBorderColour}`;
const hardBorderBottom = "border-b border-b-white";
const hardBorderRight = `border ${softBorderColour} border-l-0 border-r border-r-white`;

const formatCurrency = (num: number | undefined) => {
  if (num === undefined) {
    return "N/A"
  }
  if (num == 0) {
    return "Nil"
  }
  const options = {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  } as const;

  return num.toLocaleString('en-AU', options);
}

type TableRowProps = {
  label: string;
  values: (string | undefined)[];
  hardBorder?: boolean;
  bold?: boolean;
};

const TableRow = ({ label, values, hardBorder, bold }: TableRowProps) => {
  const rowBorderClass = hardBorder ? hardBorderBottom : "";
  const boldClass = bold ? "font-bold" : "";
  const unlabelledClass = label == "" ? "italic text-gray-300" : "";

  const getBgClass = (val?: string) => {
    if (!val || label == "") return "";
    if (val.trim().startsWith("-")) return numberNegative;
    if (val.trim().startsWith("$") || val.trim().startsWith("+")) return numberPositive;
    return "";
  };

  return (
    <tr className={`${boldClass} ${unlabelledClass}`}>
      <td className={`${text} ${hardBorderRight} ${rowBorderClass}`}>{label}</td>
      {values.map((val, i) => (
        <td key={i} className={`${number} ${mildBorder} ${rowBorderClass} ${getBgClass(val)}`} style={i === values.length - 1 ? { borderRight: "0" } : undefined}>
          {val || ""}
        </td>
      ))}
    </tr>
  );
};

export default function ValueTable({ propertyData }: PropertyTableProps) {
  const globalContext = useGlobalValues()
  if (!globalContext) return null;
  const globalValues = globalContext.values;

  let expectedPrice = propertyData.expectedPrice ?? (propertyData.priceMax + propertyData.priceMin) / 2
  let expectedRent = propertyData.expectedRentalIncome ?? (propertyData.annualRentMax + propertyData.annualRentMin) / 2

  const valuations = [
    calculateValuation(propertyData.priceMin, propertyData.annualRentMax, propertyData, globalValues),
    calculateValuation(propertyData.priceMax, propertyData.annualRentMin, propertyData, globalValues),
    calculateValuation(expectedPrice, expectedRent, propertyData, globalValues),
  ];

  return (
    <table className="w-full border-collapse text-sm p">
      <thead>
        <tr>
          <th className="border-b border-white" />
          <th className={`${text} ${noTopBorder} border-l border-l-white`}>Best</th>
          <th className={`${text} ${noTopBorder}`}>Worst</th>
          <th className={`${text} ${noTopBorder} border-r-0`}>{`${propertyData.expectedPrice ? "Valuation" : "Mean"}`}</th>
        </tr>
      </thead>
      <tbody>
        <TableRow label="Value" values={valuations.map(v => formatCurrency(v.value))} bold />
        <TableRow label="Initial Principle" values={valuations.map(v => formatCurrency(v.initialPrinciple))} bold />
        <TableRow label="Debt" values={valuations.map(v => formatCurrency(v.debt))} bold hardBorder />
        <TableRow label="Interest" values={valuations.map(v => formatCurrency(v.interest))} />
        <TableRow label="Strata Fees" values={valuations.map(v => formatCurrency(v.strataFees))} />
        <TableRow label="Council Rates" values={valuations.map(v => formatCurrency(v.councilRates))} />
        <TableRow label="Water Rates" values={valuations.map(v => formatCurrency(v.waterRates))} />
        <TableRow label="Land Tax" values={valuations.map(v => formatCurrency(v.landTax))} />
        <TableRow label="Home Insurance" values={valuations.map(v => formatCurrency(v.homeInsurance))} />
        <TableRow label="Rental Insurance" values={valuations.map(v => formatCurrency(v.landlordInsurance))} />
        <TableRow label="Unforeseen Costs" values={valuations.map(v => formatCurrency(v.unforeseenCosts))} />
        <TableRow label="Total Costs" values={valuations.map(v => formatCurrency(v.totalCosts))} hardBorder bold />
        <TableRow label="Rental Yield" values={valuations.map(v => formatCurrency(v.rentalIncome))} />
        <TableRow label="" values={[formatCurrency(expectedRent / 52) + " p/w", formatCurrency(expectedRent / 12) + " p/m", formatCurrency(expectedRent) + " p/a"]} />
        <TableRow label="Vacancy" values={valuations.map(v => formatCurrency(v.vacancyCosts))} />
        <TableRow label="Fees" values={valuations.map(v => formatCurrency(v.rentalFees))} />
        <TableRow label="Total Income" values={valuations.map(v => formatCurrency(v.totalIncome))} hardBorder bold />
        <TableRow label="Profit/Loss" values={valuations.map(v => formatCurrency(v.profitLoss))} bold />
        <TableRow label="Net Worth" values={valuations.map(v => formatCurrency(v.netWorth))} bold />
      </tbody>
    </table>
  );
}

type Valuation = {
  value: number;
  initialPrinciple: number;
  debt: number;
  interest: number;
  strataFees: number;
  councilRates: number;
  waterRates: number;
  landTax: number;
  homeInsurance: number;
  landlordInsurance: number;
  unforeseenCosts: number;
  totalCosts: number;
  rentalIncome: number;
  vacancyCosts: number;
  rentalFees: number;
  totalIncome: number;
  profitLoss: number;
  netWorth: number;
};

function calculateValuation(price: number, rent: number, propertyData: PropertyData, globalValues: GlobalValues): Valuation {
  const purchaseCost =
    globalValues.stampDuty(price) +
    globalValues.conveyancingFees +
    globalValues.inspectionFees +
    globalValues.additionalFees +
    globalValues.registrationOfTitle;

  let initialPrinciple = globalValues.initalInvestment - purchaseCost;
  initialPrinciple = Math.min(initialPrinciple, price);

  const debt = -(Math.max(0, price - initialPrinciple));
  const interest = debt * globalValues.interest;

  const strataFees = -(propertyData.costs.strataFees ?? 0);
  const councilRates = -(propertyData.costs.councilRates ?? 0);
  const waterRates = -(propertyData.costs.waterRates ?? 0);
  const landTax = -(globalValues.landTax(price / 4) ?? 0); //TODO how is land tax calucated 
  const homeInsurance = -(propertyData.costs.homeInsurance ?? 0);
  const landlordInsurance = propertyData.costs.landlordInsurance ?? 0;
  const unforeseenCosts = -(globalValues.unforeseenYearlyCosts ?? 0);

  const totalCosts =
    interest +
    strataFees +
    councilRates +
    waterRates +
    landTax +
    homeInsurance +
    landlordInsurance +
    unforeseenCosts;

  const vacancyCosts = -rent * globalValues.vacancyRates;
  const rentalFees = -rent * globalValues.rentalFees;

  const totalIncome = rent + vacancyCosts + rentalFees;
  const profitLoss = totalIncome + totalCosts;
  const netWorth = initialPrinciple + profitLoss;

  return {
    value: price,
    initialPrinciple,
    debt,
    interest,
    strataFees,
    councilRates,
    waterRates,
    landTax,
    homeInsurance,
    landlordInsurance,
    unforeseenCosts,
    totalCosts,
    rentalIncome: rent,
    vacancyCosts,
    rentalFees,
    totalIncome,
    profitLoss,
    netWorth
  };
}
