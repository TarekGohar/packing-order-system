"use client";

import { useState, useEffect, useRef } from "react";

interface DropdownSelectorProps {
  name: string;
  placeholder: string;
  options: string[];
  onValueChange?: (key: string, value: string) => void; // Callback function to notify parent component of state change
}

export default function DropdownSelector({
  name,
  placeholder,
  options,
  onValueChange,
}: DropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false); // To track if the menu is open
  const [selectedValue, setSelectedValue] = useState(placeholder);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="relative rounded-xl w-full" ref={dropdownRef}>
      <input type="hidden" value={selectedValue} name={name} />
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown open/closed
        className={`w-full px-4 py-3 bg-white hover:bg-neutral-50 border rounded-lg font-medium active:border-montrium-400 duration-200 ${
          isOpen ? "border-montrium-400" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`${
              selectedValue === placeholder
                ? "text-montrium-100"
                : "text-montrium-700"
            }`}
          >
            {selectedValue}
          </h2>
          <svg
            className={`w-5 h-5 text-montrium-700 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu: Positioned absolutely, shown only when isOpen is true */}
      {isOpen && (
        <div
          className={
            `absolute mt-2 z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto` +
            (options.length > 4 ? " h-44" : "")
          }
        >
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelectedValue(option);
                if (onValueChange) {
                  onValueChange(name, option); // Notify parent component of the change
                }
                setIsOpen(false); // Close the dropdown after selection
              }}
              className={`block w-full px-4 py-3 text-left text-montrium-700 hover:bg-neutral-100 active:bg-neutral-200 transition ease-in duration-150`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
