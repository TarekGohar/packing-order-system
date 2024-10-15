"use client";

import { PackingLabel } from "@prisma/client";
import React, { useState, useRef, useEffect } from "react";

interface OrderButtonProps {
  holdTime: number;
  label: PackingLabel;
}

export default function OrderButton({
  label: { id, key, value, currentValue, comment },
  holdTime = 500,
}: OrderButtonProps) {
  const [isHeld, setIsHeld] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const [currentNumber, setCurrentNumber] = useState(
    parseInt(currentValue, 10) || 0
  );
  const [commentValue, setCommentValue] = useState(comment);
  const [startY, setStartY] = useState<number | null>(null); // Track initial Y position for touch

  const onHold = () => {
    setIsHeld(!isHeld);
  };

  const handleDoubleTap = React.useCallback(() => {
    if (!isHeld) {
      setCurrentNumber(parseInt(value, 10));
    }
  }, [isHeld, value]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isInputFocused) {
      setIsHolding(true);
      setStartY(e.touches[0].clientY); // Track initial Y position

      timerRef.current = setTimeout(() => {
        onHold(); // Trigger onHold event after the specified hold time
      }, holdTime);
    }
  };

  const handleTouchEnd = () => {
    setIsHolding(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current); // Clear timer if released early
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null) {
      const currentY = e.touches[0].clientY;

      // If vertical movement exceeds 10 pixels, cancel the hold action
      if (Math.abs(currentY - startY) > 10) {
        setIsHolding(false);
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current); // Clear timer due to movement
        }
      }
    }
  };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <button
      type="button"
      onMouseDown={handleMouseDown} // Handle mouse hold on desktop
      onMouseUp={handleMouseUp} // Handle mouse release on desktop
      onTouchStart={handleTouchStart} // Handle touch hold on mobile
      onTouchEnd={handleTouchEnd} // Handle touch release on mobile
      onTouchMove={handleTouchMove} // Track touch movement on mobile
      onClick={handleClick}
      className={`py-3 px-4 w-full rounded-xl font-semibold unselectable ${
        currentNumber >= parseInt(value, 10) && !isHeld
          ? "bg-green-500/50 text-green-700"
          : "bg-neutral-50 text-neutral-500"
      } ${currentNumber == 0 ? "bg-neutral-50" : ""}`}
    >
      {
        <>
          {/* Comment Section */}
          <input
            type="text"
            name={`${id}_comment`}
            className={`outline-none w-full placeholder:text-neutral-200 bg-transparent select-all caret-neutral-400 ${
              isHeld ? "" : "hidden"
            }`}
            placeholder="Add a comment"
            value={commentValue || ""}
            onChange={(e) => {
              const newVal = e.target.value;
              setCommentValue(newVal);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setIsHeld(false);
              }
            }}
          />

          {/* Label Section */}
          <div
            className={`flex flex-row justify-between ${
              isHeld ? "hidden" : ""
            }`}
          >
            <div className="flex items-center gap-x-2">
              <h2 className="font-semibold">{key}</h2>

              {/* Show orange dot when comment on item */}
              {commentValue && (
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </div>

            <div className="space-x-3">
              <input
                type="numeric"
                name={`${id}_currentValue`}
                inputMode="numeric"
                className={`outline-none w-48 text-right placeholder:text-neutral-200 bg-transparent select-all caret-neutral-400`}
                style={{ width: `${Math.max(value.length, 1) * 4}ch` }}
                placeholder={"0"}
                value={currentNumber == 0 ? "" : currentNumber}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onChange={(e) => {
                  const newVal = e.target.value;
                  if (!isNaN(newVal as any) && newVal.length <= 4) {
                    setCurrentNumber(Number(newVal));
                  }
                }}
                onKeyDown={handleKeyDown}
              />
              <span>{"/"}</span>
              <span>{value}</span>
            </div>
          </div>
        </>
      }
    </button>
  );
}
