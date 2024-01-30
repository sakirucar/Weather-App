import React from "react";

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
  return (
    <div>
      HourlyWeather
      <div className="flex overflow-x-auto w-full">
        {props.weatherForecastData?.forecast.forecastday[
          props.clickedIndex ? props.clickedIndex : 0
        ]?.hour.map((hourData: HourData, i: number) => (
          <div key={i} className="flex-shrink-0 min-w-40 bg-red-300 p-5">
            <div>{timetoclock(hourData.time ?? undefined)}</div>
            <div>
              <div className="items-center justify-center">
                <img
                  className="flex bg-blue-300 w-[100px] h-[100px]"
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
                Wind:{" "}
                {props.unit === "Celcius"
                  ? `${hourData.wind_kph} kmh`
                  : `${hourData.wind_mph} mph`}
              </div>
              <div>Humidiy : {hourData.humidity}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
