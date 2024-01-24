import React, { useState } from "react";
import CurrentWeather from "@/components/currentWeather";
import Navbar from "@/components/navbar";

const forecast: React.FC = () => {
  const [unit, setUnit] = useState<string>("Celcius");
  return (
    <>
      <Navbar unit={unit} setUnit={setUnit} />
      <CurrentWeather unit={unit}  />
    </>
  );
};

export default forecast;
