"use client";

import React, { useState, ChangeEvent } from "react";

const formatDate = (dateString: string): string => {
  const cleanDate = dateString.replace(/\D/g, ""); // Remove all non-digit characters

  if (cleanDate.length <= 2) {
    return cleanDate; // Only day
  }

  if (cleanDate.length <= 4) {
    return `${cleanDate.slice(0, 2)}/${cleanDate.slice(2)}`; // Day/Month
  }

  return `${cleanDate.slice(0, 2)}/${cleanDate.slice(2, 4)}/${cleanDate.slice(
    4,
    8
  )}`; // Day/Month/Year
};

const DatePicker: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatDate(value);
    setInputValue(formattedValue);
  };

  return (
    <div>
      <input
        type="text"
        name="date"
        value={inputValue}
        onChange={handleChange}
        placeholder="DD/MM/YYYY"
        pattern="\d{2}/\d{2}/\d{4}"
        inputMode="numeric"
        maxLength={10} // Prevent entering more characters than DD/MM/YYYY
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          true ? "border-red-500" : ""
        }`}
      />
    </div>
  );
};

export default DatePicker;
