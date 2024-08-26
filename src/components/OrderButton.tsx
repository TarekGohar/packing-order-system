"use client";

import { redirect, useRouter } from "next/navigation";
import { parse } from "path";
import React, { useState, useRef, useEffect } from "react";
import { set } from "zod";

interface OrderButtonProps {
  holdTime: number;
  name: string;
  curVal: string;
  value: string;
  comment: string;
}

export default function OrderButton({
  name,
  value,
  curVal,
  comment,
  holdTime = 400,
}: OrderButtonProps) {
  const [isHeld, setIsHeld] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const [currentNumber, setCurrentNumber] = useState(parseInt(curVal, 10) || 0);
  const [commentValue, setCommentValue] = useState(comment);

  function onHold() {
    setIsHeld(!isHeld);
  }

  const handleDoubleTap = React.useCallback(() => {
    if (!isHeld) {
      setCurrentNumber(parseInt(value, 10));
    }
  }, [isHeld, value]);

  const handleMouseDown = () => {
    if (!isInputFocused) {
      setIsHolding(true);
      timerRef.current = setTimeout(() => {
        onHold(); // Trigger onHold event after the specified hold time
      }, holdTime);
    }
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current); // Clear timer if released early
    }
  };

  const handleMouseLeave = () => {
    setIsHolding(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current as NodeJS.Timeout); // Clear timer if mouse leaves the button
    }
  };

  const handleClick = () => {
    if (!isInputFocused) {
      setTapCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (tapCount === 2) {
      handleDoubleTap();
      setTapCount(0);
    }

    const timer = setTimeout(() => {
      setTapCount(0);
    }, 300); // Reset tap count after 300ms

    return () => clearTimeout(timer);
  }, [tapCount, handleDoubleTap]);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`py-3 px-4 rounded-xl flex flex-row justify-between font-semibold unselectable ${
        currentNumber >= parseInt(value, 10) && !isHeld
          ? "bg-green-500/50 text-green-700"
          : "bg-neutral-50 text-neutral-500"
      } ${currentNumber == 0 ? "bg-neutral-50" : ""}`}
    >
      {isHeld ? (
        <input
          type="text"
          name="item-comment"
          className={`outline-none w-full placeholder:text-neutral-200 bg-transparent select-all caret-neutral-400`}
          placeholder="Add a comment"
          value={commentValue}
          onChange={(e) => {
            const newVal = e.target.value;
            setCommentValue(newVal);
          }}
        />
      ) : (
        <>
          <h2 className="font-semibold">{name}</h2>
          <div className="space-x-3">
            <input
              type="numeric"
              name="item-number"
              inputMode="numeric"
              className={`outline-none w-48 text-right placeholder:text-neutral-200 bg-transparent select-all caret-neutral-400`}
              style={{ width: `${Math.max(value.length, 1) * 4}ch` }}
              placeholder={"0"}
              max={value.length * 4}
              value={currentNumber == 0 ? "" : currentNumber}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(e) => {
                const newVal = e.target.value;
                if (
                  !isNaN(newVal as any) &&
                  newVal.length <= value.length * 4
                ) {
                  setCurrentNumber(Number(newVal));
                }
              }}
            />
            <span>{"/"}</span>
            <span>{value}</span>
          </div>
        </>
      )}
    </button>
  );
}
