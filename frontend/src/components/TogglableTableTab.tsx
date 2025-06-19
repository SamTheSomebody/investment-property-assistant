import React, { useRef, useState, useEffect } from "react";
const ICONS = "material-symbols-outlined text-2xl";

interface ToggleTableProps {
  label: string;
  rows: [string, string][];
}

export const TogglableTable: React.FC<ToggleTableProps> = ({ label, rows }) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (wrapperRef.current) {
      setHeight(show ? `${wrapperRef.current.scrollHeight}px` : "0px");
    }
  }, [show]);
  return (
    <div className="flex-0 flex flex-col">
      <div className="flex bg-transparent rounded-none text-white items-center justify-between p-2 cursor-pointer transition-default 
      border-b border-b-gray-800 hover:border-b-purple hover:bg-black/20"
        onClick={() => setShow((prev) => !prev)}>
        <p className="text-left">{label}</p>
        <span className={`${ICONS} transition-default ${show ? "rotate-180" : "rotate-0"}`}>keyboard_arrow_down</span>
      </div>
      <div style={{ height, transition: "height 300ms ease", overflow: "hidden", }}>
        <div ref={wrapperRef} className={`flex flex-col bg-black/20 transition-default overflow-y-auto`}>
          {rows.map(([col1, col2], _) => (
            <div className={`flex justify-between border-b border-b-gray-800`}>
              <p className="text-sm text-left px-2">{col1}</p>
              <p className="text-sm text-right px-2">{col2}</p>
            </div>
          ))}
        </div>
      </div >
    </div >
  );
};
