"use client";

import { useState } from "react";
import { start } from "repl";

interface CheckboxProps {
  name: string;
  startState?: boolean;
}

export default function Checkbox({ name, startState }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(startState || false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      <label className="relative">
        <input
          name={name}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="absolute opacity-0 h-0 w-0"
        />
        <div
          className={`w-4 h-4 border-2 rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 ${
            isChecked ? "border-green-500 bg-green-500" : "border-neutral-300"
          }`}
        >
          {isChecked && (
            <svg
              className="pl-[1.25px] h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </label>
    </div>
  );
}
