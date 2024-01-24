import React from "react";
import { Icon } from "@iconify/react";
import { apiKey } from "@/constants";
import useGetWeatherForecast from "@/services/deneme/hooks/useGetWeatherForecast";
import CircularProgress from "@mui/material/CircularProgress";

interface CurrentWeatherProps {
  unit: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ unit }) => {
  const {
    data: weatherForecastData,
    mutate: weatherForecastMutate,
    isLoading: weatherForecastLoading,
  } = useGetWeatherForecast({
    key: apiKey,
    q: "Aydin",
    days: 10,
    aqi: false,
    alerts: false,
  });

  console.log(weatherForecastData);

  return (
    <>
      <div>currentWeather</div>
      <div className="bg-gray-400 flex items-center justify-center p-5 m-5">
        {weatherForecastLoading ? (
          <CircularProgress />
        ) : (
          <div className="bg-red-400  w-3/4 h-full p-5">
            <div className="">{weatherForecastData?.location.name}</div>
            <div className="flex items-center gap-2">
              <Icon
                fontSize={25}
                onClick={() => weatherForecastMutate()}
                className="cursor-pointer"
                icon="ic:round-refresh"
              />
              Last updated {weatherForecastData?.current.last_updated}
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  className="w-28 h-28"
                  src={weatherForecastData?.current.condition.icon}
                  alt=""
                />
                <div className="text-5xl font-semibold">
                  {unit === "Celcius"
                    ? `${weatherForecastData?.current.temp_c}°C`
                    : `${weatherForecastData?.current.temp_f}°F`}
                </div>
              </div>
              <div className="flex flex-col mx-12">
                <div className="font-semibold">
                  {weatherForecastData?.current.condition.text}
                </div>
                <div>
                  Feels like{" "}
                  {unit === "Celcius"
                    ? `${weatherForecastData?.current.feelslike_c}°C`
                    : `${weatherForecastData?.current.feelslike_f}°F`}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center w-1/5 h-full">
                Wind
                <div>
                  {unit === "Celcius"
                    ? `${weatherForecastData?.current.wind_kph} kph`
                    : `${weatherForecastData?.current.wind_mph} mph`}
                </div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Humidity
                <div>{weatherForecastData?.current.humidity} %</div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Visibility
                <div>
                  {unit === "c"
                    ? `${weatherForecastData?.current.vis_km} km`
                    : `${weatherForecastData?.current.vis_miles} mi`}
                </div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                UV
                <div>{weatherForecastData?.current.uv}</div>
              </div>
              <div className="flex flex-col items-center w-1/5 h-full">
                Pressure
                <div>
                  {unit === "c"
                    ? `${weatherForecastData?.current.pressure_mb} mb`
                    : `${weatherForecastData?.current.pressure_in} in`}
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
