import React, { useState } from "react";
import TogglableSlider from "./TogglableSlider"
import TogglableSwitch from "./TogglableSwitch"
import { TogglableTable } from "./TogglableTableTab"
import { useGlobalValues } from "../context/GlobalValuesContext"

const ICONS = "material-symbols-outlined text-2xl flex justify-center";

export default function Sidebar() {
  const { values, setValues } = useGlobalValues();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateValue = (key: keyof typeof values, value: any) => {
    setValues({ ...values, [key]: value });
  };

  return (
    <div className={`relative h-full bg-gray-875 shadow border-r border-gray-850 transition-default 
      ${sidebarOpen ? "w-96" : "w-64"}`}>
      <button onClick={() => setSidebarOpen((open) => !open)}
        className="absolute right-0 top-24 -translate-y-1/2 translate-x-1/2 z-50 w-14 h-14 rounded-full p-2
        text-white shadow-2xl bg-purple hover:bg-purple-light transition-default">
        <span className={ICONS}>{sidebarOpen ? "chevron_left" : "tune"}</span>
      </button >
      <div className="flex flex-col h-full w-full overflow-hidden p-4">
        <TogglableSlider label="Initial Investment" min={0} max={1000000} step={1000} value={values.initalInvestment} onChange={(val) => updateValue("initalInvestment", val)} enabled={sidebarOpen} format="$" />
        <hr className="border-gray-800 my-2" />
        <TogglableSlider label="Inflation" min={0} max={20} step={0.1} value={values.inflation * 100} onChange={(val) => updateValue("inflation", val / 100)} enabled={sidebarOpen} format="%" />
        <TogglableSlider label="Interest Rate" min={0} max={20} step={0.1} value={values.interest * 100} onChange={(val) => updateValue("interest", val / 100)} enabled={sidebarOpen} format="%" />
        <TogglableSlider label="ASX Return" min={0} max={20} step={0.1} value={values.asx * 100} onChange={(val) => updateValue("asx", val / 100)} enabled={sidebarOpen} format="%" />
        <hr className="border-gray-800 my-2" />
        <TogglableSlider label="Conveyancing Fees" min={0} max={3000} step={50} value={values.conveyancingFees} onChange={(val) => updateValue("conveyancingFees", val)} enabled={sidebarOpen} format="$" />
        <TogglableSlider label="Inspection Fees" min={0} max={1000} step={50} value={values.inspectionFees} onChange={(val) => updateValue("inspectionFees", val)} enabled={sidebarOpen} format="$" />
        <TogglableSwitch label="Registration of Title" checked={values.registrationOfTitle != 0} onChange={(val) => updateValue("registrationOfTitle", val ? 119 : 0)} enabled={sidebarOpen} onValue={"$119"} offValue={"$0"} />
        <TogglableSlider label="Additional Fees" min={0} max={100000} step={100} value={values.additionalFees} onChange={(val) => updateValue("additionalFees", val)} enabled={sidebarOpen} format="$" />
        <hr className="border-gray-800 my-2" />
        <TogglableSlider label="Vacancy Rates" min={0} max={25} step={0.1} value={values.vacancyRates * 100} onChange={(val) => updateValue("vacancyRates", val / 100)} enabled={sidebarOpen} format="%" />
        <TogglableSlider label="Rental Fees" min={0} max={15} step={0.1} value={values.rentalFees * 100} onChange={(val) => updateValue("rentalFees", val / 100)} enabled={sidebarOpen} format="%" />
        <TogglableSlider label="Unforeseen Costs (p/a)" min={0} max={20000} step={100} value={values.unforeseenYearlyCosts} onChange={(val) => updateValue("unforeseenYearlyCosts", val)} enabled={sidebarOpen} format="$" />
        <hr className="border-gray-800" />
        <TogglableTable
          label="Land Tax"
          rows={[
            ["< $50k", "Nil"],
            ["$50k–$100k", "$500"],
            ["$100k–$300k", "$975"],
            ["$300k–$600k", "$1350 + 0.3% > $300k"],
            ["$600k–$1m", "$2250 + 0.6% > $600k"],
            ["$1m–$1.8m", "$4650 + 0.9% > $1m"],
            ["$1.8m–$3m", "$11,850 + 1.65% > $1.8m"],
            ["> $3m", "$31,650 + 2.65% > $3M"],
          ]}
        />
        <TogglableTable
          label="Stamp Duty"
          rows={[
            ["$0–$25k", "1.4% of value"],
            ["$25k–$130k", "$350 + 2.4% over $25k"],
            ["$130k–$960k", "$2870 + 6% over $130k"],
            ["$960k–$2m", "5.5% of full value"],
            ["> $2m", "$110k + 6.5% over $2M"],
          ]}
        />
      </div>
    </div>
  );
}
