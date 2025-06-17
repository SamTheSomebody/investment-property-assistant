import React from "react";
import { PropertyCosts, PropertyData, PropertyType } from "../types";

export type GlobalValues = {
  interest: number;
  unforeseenCosts: number;
  landTax: number; //TODO this needs to be a function
  purchaseCosts: number; //TODO this needs to be a function
  initalInvestment: number;
  vacancyRates: number;
  rentalFees: number;
};

export type PropertyTableProps = {
  propertyData: PropertyData;
  globalValues: GlobalValues;
};

const softBorderColour = "border-gray-900/20"
const text = "text-left px-1";
const number = "text-right px-1";
const numberPositive = "bg-green-800/30"; // very s5oft green bg
const numberNegative = "bg-red-800/30"; // very soft red bg
const mildBorder = `border ${softBorderColour}`;
const noTopBorder = `border border-t-0 border-b-2 border-b-white ${softBorderColour}`;
const hardBorderBottom = "border-b-2 border-white";
const hardBorderRight = `border ${softBorderColour} border-l-0 border-r-2 border-r-white`;

const formatCurrency = (num: number | undefined) =>
  num === undefined ? "U/A" : `$${num.toFixed(0).toLocaleString()}`;

const formatPercentage = (num: number | undefined) =>
  num === undefined ? "U/A" : `${(num * 100).toFixed(2)}%`;

const TableRow = ({ label, expected, margin, valuation, hardBorder, bold }: {
  label: string;
  expected?: string;
  margin?: string;
  valuation?: string;
  hardBorder?: boolean;
  bold?: boolean;
}) => {
  const rowBorderClass = hardBorder ? hardBorderBottom : "";
  const boldClass = bold ? "font-bold" : "";

  const getBgClass = (val?: string) => {
    if (!val) return "";
    if (val.trim().startsWith("$-")) return numberNegative;
    if (val.trim().startsWith("$") || val.trim().startsWith("+")) return numberPositive;
    return "";
  };

  return (
    <tr className={`${rowBorderClass} ${boldClass}`}>
      <td className={`${text} ${hardBorderRight}`}>{label}</td>
      <td className={`${number} ${mildBorder} ${getBgClass(expected)}`}>{expected || ""}</td>
      <td className={`${number} ${mildBorder} ${getBgClass(margin)}`}>{margin || ""}</td>
      <td className={`${number} ${mildBorder} border-r-0 ${getBgClass(valuation)}`}>{valuation || ""}</td>
    </tr>
  );
};

export default function ValueTable({ propertyData, globalValues }: PropertyTableProps) {
  let value = (propertyData.priceMin + propertyData.priceMax) / 2
  let valueMargin = value - propertyData.priceMin;
  let initialPrinciple = globalValues.initalInvestment * globalValues.purchaseCosts
  let debt = -(value - initialPrinciple)
  let interest = debt * globalValues.interest
  let strataFees = -(propertyData.costs.strataFees ?? 0)
  let councilRates = -(propertyData.costs.councilRates ?? 0)
  let waterRates = -(propertyData.costs.waterRates ?? 0)
  let landTax = -(globalValues.landTax ?? 0)
  let homeInsurance = -(propertyData.costs.homeInsurance ?? 0) //TODO probably better as a global percentage?
  let landlordInsurance = propertyData.costs.landlordInsurance ?? 0 //TODO probably better as a global percentage?

  const totalCosts =
    interest +
    strataFees +
    councilRates +
    waterRates +
    landTax +
    homeInsurance +
    landlordInsurance +
    globalValues.unforeseenCosts;

  let rentalIncome = (propertyData.annualRentMin + propertyData.annualRentMax) / 2
  let rentalMargin = rentalIncome - propertyData.annualRentMin
  let vacancyCosts = -rentalIncome * globalValues.vacancyRates
  let rentalCosts = -rentalIncome * globalValues.rentalFees
  const totalIncome = rentalIncome + vacancyCosts + rentalCosts
  const profitLoss = totalIncome - totalCosts;
  const netWorth = value + profitLoss

  return (
    <table className="w-full border-collapse text-sm p">
      <thead>
        <tr>
          <th className="border-b-2 border-white" />
          <th className={`${text} ${noTopBorder} border-l-2 border-l-white`}>Expected</th>
          <th className={`${text} ${noTopBorder}`}>Margin</th>
          <th className={`${text} ${noTopBorder} border-r-0`}>Valuation</th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          label="Value"
          expected={formatCurrency(value)}
          margin={formatCurrency(valueMargin)}
          valuation={propertyData.expectedPrice ? formatPercentage(1 - propertyData.expectedPrice / value) : "N/A"}
          bold
        />
        <TableRow
          label="Initial Principle"
          expected={formatCurrency(initialPrinciple)}
          margin=""
          valuation={formatCurrency(initialPrinciple)} // you can change this
          bold
        />
        <TableRow
          label="Debt"
          expected={formatCurrency(debt)}
          margin=""
          valuation={formatCurrency(debt)}
          hardBorder
          bold
        />
        <TableRow label="Interest" expected={formatCurrency(interest)} />
        <TableRow label="Strata Fees" expected={formatCurrency(strataFees)} />
        <TableRow label="Council Rates" expected={formatCurrency(councilRates)} />
        <TableRow label="Water Rates" expected={formatCurrency(waterRates)} />
        <TableRow label="Land Tax" expected={formatCurrency(landTax)} />
        <TableRow label="Home Insurance" expected={formatCurrency(homeInsurance)} />
        <TableRow label="Retntal Insurance" expected={formatCurrency(landlordInsurance)} />
        <TableRow label="Unforeseen Costs" expected={formatCurrency(globalValues.unforeseenCosts)} />
        <TableRow label="Total Costs" expected={formatCurrency(totalCosts)} hardBorder bold />
        <TableRow label="Rental Yield"
          expected={formatCurrency(rentalIncome)}
          margin={formatCurrency(rentalMargin)}
          valuation={propertyData.expectedRentalIncome ? formatPercentage(1 - propertyData.expectedRentalIncome / rentalIncome) : "N/A"}
        />
        <TableRow label=""
          expected={formatCurrency(rentalIncome / 52) + " p/w"}
          margin={formatCurrency(rentalIncome / 12) + " p/m"}
          valuation={formatCurrency(rentalIncome) + " p/a"}
        />
        <TableRow label="Vacancy" expected={formatCurrency(vacancyCosts)} />
        <TableRow label="Fees" expected={formatCurrency(rentalCosts)} />
        <TableRow label="Total Income" expected={formatCurrency(totalIncome)} hardBorder bold />
        <TableRow label="Profit/Loss" expected={formatCurrency(profitLoss)} bold />
        <TableRow label="Networth" expected={formatCurrency(netWorth)} bold />
      </tbody>
    </table>
  );
}
