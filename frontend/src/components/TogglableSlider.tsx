import React from 'react';
import Slider from './Slider';

type TogglableSliderProps = {
  label: string;
  value: number;
  format?: '$' | '%' | '';
  enabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
};

const TogglableSlider: React.FC<TogglableSliderProps> = ({
  label = 'Value',
  format = '',
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
  enabled = true,
}) => {
  return (
    <div className="relative overflow-hidden p-2">
      <div className={`transition-default ${enabled ? 'translate-y-0 opacity-100 delay-200 ' : 'translate-y-[150%] opacity-0'}`}>
        <Slider label={label.replace(' ', '')} min={min} max={max} step={step} value={value} onChange={onChange} format={format} />
      </div>
      <div className={`absolute inset-0 justify-between transition-default ${enabled ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100 delay-200'}`}>
        <p className="">{label}: </p>
        <p className="font-medium">{formatValue(value, format)}</p>
      </div>
    </div>
  );
};

export default TogglableSlider;

function formatValue(value: number, format: '$' | '%' | ''): string {
  switch (format) {
    case '$':
      return '$' + value.toLocaleString();
    case '%':
      return value.toFixed(2) + '%';
    default:
      return value.toString();
  }
}
