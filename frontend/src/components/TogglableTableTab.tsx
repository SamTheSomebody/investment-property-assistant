import React, { useState } from "react";
const ICONS = "material-symbols-outlined text-2xl";

interface ToggleTableProps {
  label: string;
  rows: [string, string][];
}

export const TogglableTable: React.FC<ToggleTableProps> = ({ label, rows }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex bg-transparent rounded-none text-white items-center justify-between p-2 cursor-pointer transition-default 
      border-b border-b-gray-800 hover:border-b-purple hover:bg-black/20"
        onClick={() => setShow((prev) => !prev)}>
        <p className="text-left">{label}</p>
        <span className={ICONS}>{show ? "keyboard_arrow_up" : "keyboard_arrow_down"}</span>
      </div>
      <table className={`flex w-full bg-black/20 transition-default overflow-hidden ${show ? "h-fit" : "h-0"}`}>
        <tbody>
          {rows.map(([col1, col2], i) => (
            <tr key={i} className={`w-full border-b border-b-gray-800`}>
              <td className="text-sm text-left px-2">{col1}</td>
              <td className="text-sm text-right px-2">{col2}</td>
            </tr>
          ))}
        </tbody>
      </table >
    </div >
  );
};
