import React, { useState } from "react";
import CurrentWeather from "@/components/currentWeather";
import Navbar from "@/components/navbar";
import useGetWeatherForecast from "@/services/deneme/hooks/useGetWeatherForecast";
import { apiKey } from "@/constants";
import useGetLocation from "@/services/deneme/hooks/useGetLocation";

const Forecast = () => {
  const [unit, setUnit] = useState<string>("Celcius");
  const [city, setCity] = useState<string>("Aydın");

  const engChars = {
    Ğ: "G",
    Ü: "U",
    Ş: "S",
    İ: "I",
    Ö: "O",
    Ç: "C",
    ğ: "g",
    ü: "u",
    ş: "s",
    ı: "i",
    ö: "o",
    ç: "c",
  };

  const toEN = (str: string) =>
    //@ts-ignore
    [...str].map((c) => engChars[c as keyof typeof engChars] || c).join("");

  const {
    data: weatherForecastData,
    mutate: weatherForecastMutate,
    isLoading: weatherForecastLoading,
  } = useGetWeatherForecast({
    key: apiKey,
    q: toEN(city),
    days: 10,
    aqi: false,
    alerts: false,
  });

  console.log(weatherForecastData);

  const {
    data: locationData,
    mutate: LocationMutate,
    isLoading: LocationLoading,
  } = useGetLocation({
    key: apiKey,
    q: toEN(city),
  });

  const handleSearch = () => {
    weatherForecastMutate();
  };

  return (
    <>
      <Navbar
        unit={unit}
        setUnit={setUnit}
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        locationData={locationData}
        weatherForecastMutate={weatherForecastMutate}
      />
      <CurrentWeather
        unit={unit}
        city={city}
        weatherForecastMutate={weatherForecastMutate}
        weatherForecastLoading={weatherForecastLoading}
        weatherForecastData={weatherForecastData}
      />
    </>
  );
};

export default Forecast;
