import React, { useState, Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react";

interface NavbarProps {
  unit: string;
  setUnit: Dispatch<SetStateAction<string>>;
}

const Navbar = (props: NavbarProps) => {
  const options: string[] = ["Celcius", "Fahrenheit"];

  return (
    <div className="bg-gray-500">
      <nav className="flex">
        <div className="flex">
          <input type="text" />
          <Icon icon="ic:round-search" />
        </div>
        <div className="flex justify-end bg-red-500 w-1/3">
          <select
            value={props.unit}
            onChange={(e) => props.setUnit(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
