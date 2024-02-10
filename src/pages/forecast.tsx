import React, { useState } from "react";
import useGetWeatherForecast from "@/services/deneme/hooks/useGetWeatherForecast";
import { apiKey } from "@/constants";
import useGetLocation from "@/services/deneme/hooks/useGetLocation";
import CurrentWeather from "@/components/CurrentWeather";
import Navbar from "@/components/Navbar";
import SunMoon from "@/components/SunMoon";
import DailyWeather from "@/components/DailyWeather";
import HourlyWeather from "@/components/HourlyWeather";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const Forecast = () => {
  const [unit, setUnit] = useState<string>("Celcius");
  const [city, setCity] = useState<string>("Aydın");
  const [clickedIndex, setClickedIndex] = useState<number | null>(0);

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
    aqi: true,
    alerts: true,
  });

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
  console.log(weatherForecastData?.location);

  return (
    <>
      <div
        className="bg-[url('https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg')] 
                    bg-fixed text-white "
      >
        <div>
          <Navbar
            unit={unit}
            setUnit={setUnit}
            city={city}
            setCity={setCity}
            onSearch={handleSearch}
            locationData={locationData}
            weatherForecastMutate={weatherForecastMutate}
          />
        </div>

        <div className="flex justify-center">
          <CurrentWeather
            unit={unit}
            city={city}
            weatherForecastMutate={weatherForecastMutate}
            weatherForecastLoading={weatherForecastLoading}
            weatherForecastData={weatherForecastData}
          />
        </div>

        <div className="flex justify-center">
          <div className="flex justify-between w-5/6 p-5 gap-10">
            <div className="w-2/5">
              <MapComponent
                position={
                  weatherForecastData?.location
                    ? [
                        weatherForecastData?.location.lat as number,
                        weatherForecastData?.location.lon as number,
                      ]
                    : [0, 0]
                }
              />
            </div>
            <div className="flex justify-center items-center w-2/5">
              <SunMoon weatherForecastData={weatherForecastData} unit={unit} />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <DailyWeather
            unit={unit}
            weatherForecastData={weatherForecastData}
            clickedIndex={clickedIndex}
            setClickedIndex={setClickedIndex}
          />
        </div>
        <div>
          <HourlyWeather
            unit={unit}
            weatherForecastData={weatherForecastData}
            clickedIndex={clickedIndex}
            setClickedIndex={setClickedIndex}
          />
        </div>
      </div>
    </>
  );
};

export default Forecast;
