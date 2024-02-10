import React, { useState } from "react";
import { Icon } from "@iconify/react";
interface HourlyWeatherProps {
  unit: string;
  weatherForecastData?: WeatherForecastModel;
  clickedIndex: number | null;
  setClickedIndex: (value: number | null) => void;
}

const timetoclock = (basetime?: string): string | undefined => {
  const clock = basetime?.split(" ");
  return clock ? clock[1] : undefined;
};

const HourlyWeather = (props: HourlyWeatherProps) => {
  console.log(props.weatherForecastData);
  const [startIndex, setStartIndex] = useState(0);

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + 8);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 8, 0));
  };

  return (
    <div className="flex flex-col items-center font-lato rounded-xl">
      <div className="flex  w-5/6 h-96 justify-center gap-5 p-2">
        <div className="flex items-center">
          <button
            className="flex rounded-full items-center cursor-pointer backdrop-blur-md"
            onClick={handlePrevClick}
            disabled={startIndex === 0}
          >
            <Icon fontSize={30} icon="ic:round-arrow-back-ios-new" />
          </button>
        </div>

        <div className="flex w-full items-center gap-5">
          {props.weatherForecastData?.forecast.forecastday[
            props.clickedIndex ? props.clickedIndex : 0
          ]?.hour
            .slice(startIndex, startIndex + 8)
            .map((hourData: HourData, i: number) => (
              <div key={i} className="flex backdrop-blur-md">
                <div className="flex flex-col w-40 h-72 p-5">
                  <div>{timetoclock(hourData.time ?? undefined)}</div>
                  <div>
                    <img
                      className="flex w-full"
                      src={hourData.condition.icon}
                      alt=""
                    />
                    <div>
                      {props.unit === "Celcius"
                        ? `${hourData.temp_c}°C`
                        : `${hourData.temp_f}°F`}
                    </div>
                    {hourData.condition.text}
                  </div>
                  <div>
                    <div>
                      Wind:{" "}
                      {props.unit === "Celcius"
                        ? `${hourData.wind_kph} kmh`
                        : `${hourData.wind_mph} mph`}
                    </div>
                    <div>Humidiy : {hourData.humidity}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center">
          <button
            className="flex rounded-full items-center cursor-pointer backdrop-blur-md "
            onClick={handleNextClick}
            disabled={
              startIndex + 8 >=
              (props.weatherForecastData?.forecast.forecastday[
                props.clickedIndex ? props.clickedIndex : 0
              ]?.hour.length || 0)
            }
          >
            <Icon fontSize={30} icon="ic:round-arrow-forward-ios" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
