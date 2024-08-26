"use client";

import React, { useState, ChangeEvent } from "react";

interface DatePickerProps {
  error: boolean;
}

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

export function DatePicker({ error }: DatePickerProps) {
  const [inputValue, setInputValue] = useState<string>("");
  console.log(error);

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
        className={`form-btn ${
          error ? "border-red-500" : "focus:border-blue-500"
        }`}
      />
    </div>
  );
}

export default DatePicker;
