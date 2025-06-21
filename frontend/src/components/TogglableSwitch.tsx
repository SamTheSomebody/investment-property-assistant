import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  enabled?: boolean;
  onValue: string;
  offValue: string;
}

export default function TogglableSwitch({ label, checked, onChange, enabled, onValue, offValue }: ToggleProps) {
  return (
    <div className="relative overflow-hidden p-2">
      <div className={`transition-default ${enabled ? 'translate-y-0 opacity-100 delay-200 ' : 'translate-y-[150%] opacity-0'}`}>
        <LabeledSwitch label={label} checked={checked} onChange={onChange} onValue={onValue} offValue={offValue} />
      </div>
      <div className={`absolute inset-0 justify-between transition-default ${enabled ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100 delay-200'}`}>
        <p className="">{label}: </p>
        <p className="font-medium">{checked ? onValue : offValue}</p>
      </div>
    </div>
  );
}

function LabeledSwitch({ label, checked, onChange, onValue, offValue }: ToggleProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white">{label}</label>
      <div className="flex justify-between items-center space-x-4">
        <p className="text-gray-500 italic pt-1">
          ({offValue}/{onValue})
        </p>
        <Switch checked={checked} onChange={onChange} />
      </div>
    </div>
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative -top-2 h-8 w-14 rounded-full transition-colors overflow-hidden ${checked ? 'bg-purple' : 'bg-gray-700'}`}>
      <span className={`absolute top-0 h-full aspect-square shadow transform rounded-full bg-white transition-transform ${checked ? 'translate-x-0' : '-translate-x-full'}`} />
    </button>
  );
}
