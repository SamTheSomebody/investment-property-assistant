import React, { useState } from "react";
import Slider from "./Slider"
const ICONS = "material-symbols-outlined text-2xl";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [slider1Value, setSlider1Value] = useState(50);
  const [slider2Value, setSlider2Value] = useState(25);

  return (
    <div className="h-full w-full bg-gray-850">
      < button onClick={() => setSidebarOpen((open) => !open)}
        className="rounded-full h-15 w-15 p-2 bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition">
        <span className={ICONS}>{sidebarOpen ? "chevron_left" : "chevron_right"}</span>
      </button >
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Settings</h2>

          <Slider
            label="Slider 1"
            min={0}
            max={100}
            step={1}
            value={slider1Value}
            onChange={setSlider1Value}
          />

          <Slider
            label="Slider 2"
            min={0}
            max={50}
            step={0.5}
            value={slider2Value}
            onChange={setSlider2Value}
          />
        </div>
      </aside>
    </div >
  );
}
