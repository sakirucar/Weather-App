import React from "react";
import { Icon } from "@iconify/react";
import CircularProgress from "@mui/material/CircularProgress";

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
      <div className="flex flex-col w-5/6 items-center justify-center p-5 mt-5 font-lato">
        {props.weatherForecastLoading ? (
          <CircularProgress />
        ) : (
          <div className=" w-full h-full p-5 backdrop-blur-lg rounded-xl">
            <div className="">
              {props.weatherForecastData?.location.name}/
              {props.weatherForecastData?.location.country}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Icon
                fontSize={25}
                onClick={() => props.weatherForecastMutate()}
                className="cursor-pointer"
                icon="ic:round-refresh"
              />
              Last updated {props.weatherForecastData?.current.last_updated}
            </div>
            <div className="flex items-center gap-10 mt-2">
              <div className="flex items-center justify-center w-1/5 gap-3">
                <img
                  className="w-28 h-28"
                  src={props.weatherForecastData?.current.condition.icon}
                  alt=""
                />
                <div className="text-6xl">
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.temp_c}°C`
                    : `${props.weatherForecastData?.current.temp_f}°F`}
                </div>
              </div>
              <div className="flex mx-12 gap-20 items-center">
                <div className="text-4xl">
                  {props.weatherForecastData?.current.condition.text}
                </div>
                <div className="text-2xl">
                  Feels like{" "}
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.feelslike_c}°C`
                    : `${props.weatherForecastData?.current.feelslike_f}°F`}
                </div>
              </div>
              <div className="flex flex-col text-lg">
                <div className="flex gap-2">
                  <label>Maximum</label>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.forecast.forecastday[0].day.maxtemp_c}°C`
                    : `${props.weatherForecastData?.forecast.forecastday[0].day.maxtemp_f}°F`}
                </div>
                <div className="flex gap-3">
                  <label>Minimum</label>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.forecast.forecastday[0].day.mintemp_c}°C`
                    : `${props.weatherForecastData?.forecast.forecastday[0].day.mintemp_f}°F`}
                </div>
              </div>
            </div>
            <div className="flex text-lg">
              <div className="flex flex-col items-center w-1/5 h-full">
                Wind
                <Icon fontSize={50} icon="meteocons:wind-fill" />
                <div>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.wind_kph} kph`
                    : `${props.weatherForecastData?.current.wind_mph} mph`}
                </div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Humidity
                <Icon fontSize={50} icon="meteocons:humidity-fill" />
                <div>{props.weatherForecastData?.current.humidity} %</div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Visibility
                <Icon fontSize={50} icon="meteocons:mist-fill" />
                <div>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.vis_km} km`
                    : `${props.weatherForecastData?.current.vis_miles} mi`}
                </div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                UV
                <Icon
                  fontSize={50}
                  icon={`meteocons:uv-index-${props.weatherForecastData?.current.uv}-fill`}
                />
                <div>{props.weatherForecastData?.current.uv}</div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Pressure
                <div className="flex ">
                  <Icon fontSize={50} icon="meteocons:barometer-fill" />
                </div>
                <div>
                  {props.unit === "Celcius"
                    ? `${props.weatherForecastData?.current.pressure_mb} mb`
                    : `${props.weatherForecastData?.current.pressure_in} in`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentWeather;
