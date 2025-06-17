
import React, { useState } from "react";

type SliderWithInputProps = {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
};

const SliderWithInput: React.FC<SliderWithInputProps> = ({
  label = "Value",
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
}) => {
  const [, setValue] = useState(value);

  const handleChange = (val: number) => {
    const clamped = Math.min(max, Math.max(min, val));
    setValue(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          className="flex-1 appearance-none h-2 bg-gray-300 rounded outline-none transition-all"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SliderWithInput;
