import React, { useState } from "react";

const Toggle = ({turnOnColor, turnOffColor}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <label className="flex cursor-pointer select-none items-center m-1 ">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
            }}
            className="sr-only"
          />
          <div
            className={`box block h-7 w-12 rounded-full ${
              isChecked ? turnOnColor : turnOffColor
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Toggle;
