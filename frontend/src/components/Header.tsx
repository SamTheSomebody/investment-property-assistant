import React from "react"

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 text-xl bold bg-gray-875 shadow-xl z-10">
      <h3>Property Investment Assistant</h3>
      <button className="text-sm">Add New</button>
    </header>
  );
}
