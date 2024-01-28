import React from "react";
import { Icon } from "@iconify/react";
import CircularProgress from "@mui/material/CircularProgress";
import DailyWeather from "./dailyWeather";

interface CurrentWeatherProps {
  unit: string;
  city: string;
  weatherForecastMutate: () => void;
  weatherForecastLoading: boolean;
  weatherForecastData?: WeatherForecastModel;
}
const CurrentWeather = (props: CurrentWeatherProps) => {
  return (
    <>
      <div className="bg-gray-400 flex flex-col items-center justify-center p-5 m-5">
        {props.weatherForecastLoading ? (
          <CircularProgress />
        ) : (
          <div className="bg-red-400  w-3/4 h-full p-5">
            <div className="">
              {props.weatherForecastData?.location.name} /{" "}
              {props.weatherForecastData?.location.country}
            </div>
            <div className="flex items-center gap-2">
              <Icon
                fontSize={25}
                onClick={() => props.weatherForecastMutate()}
                className="cursor-pointer"
                icon="ic:round-refresh"
              />
              Last updated {props.weatherForecastData?.current.last_updated}
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  className="w-28 h-28"
                  src={props.weatherForecastData?.current.condition.icon}
                  alt=""
                />
                <div className="text-5xl font-semibold">
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.temp_c}°C`
                    : `${props.weatherForecastData?.current.temp_f}°F`}
                </div>
              </div>
              <div className="flex flex-col mx-12">
                <div className="font-semibold">
                  {props.weatherForecastData?.current.condition.text}
                </div>
                <div>
                  Feels like{" "}
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.feelslike_c}°C`
                    : `${props.weatherForecastData?.current.feelslike_f}°F`}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center w-1/5 h-full">
                Wind
                <div>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.wind_kph} kph`
                    : `${props.weatherForecastData?.current.wind_mph} mph`}
                </div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Humidity
                <div>{props.weatherForecastData?.current.humidity} %</div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Visibility
                <div>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.vis_km} km`
                    : `${props.weatherForecastData?.current.vis_miles} mi`}
                </div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                UV
                <div>{props.weatherForecastData?.current.uv}</div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Pressure
                <div>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.pressure_mb} mb`
                    : `${props.weatherForecastData?.current.pressure_in} in`}
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <DailyWeather />
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
