import React from "react"

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2 border-b border-gray-850 text-xl bold bg-gray-875 shadow-xl z-10">
      <h3 className="pl-2 ">PROPERTY INVESTMENT ASSISTANT</h3>
      <button className="text-sm">Add New</button>
    </header>
  );
}
