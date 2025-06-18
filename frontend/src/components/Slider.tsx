import React, { useState } from "react";

type SliderProps = {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  format?: "$" | "%" | "";
  onChange?: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ label = "Value", min = 0, max = 100, step = 1, value = 50, format = "", onChange, }) => {
  const [, setValue] = useState(value);
  const handleChange = (val: number) => {
    const clamped = Math.round(Math.min(max, Math.max(min, val)) * 10) / 10;
    setValue(clamped);
    onChange?.(clamped);
  };
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white">{label}</label>
      <div className="flex items-center space-x-4">
        <input type="range"
          className="flex-1 appearance-none accent-purple h-1 bg-gray-800 rounded outline-none transition-all"
          min={min} max={max} step={step} value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        {format === "$" ? <p>$</p> : null}
        <input
          type="number"
          className="w-24 p-1 rounded text-right"
          value={formatInputValue(value, format)}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        {format === "%" ? <p>%</p> : null}
      </div>
    </div>
  );
};

function formatInputValue(value: number, format: "$" | "%" | ""): string {
  switch (format) {
    case "$":
      return value.toFixed(0);
    case "%":
      return value.toFixed(2);
    default:
      return value.toString();
  }
}

export default Slider;
