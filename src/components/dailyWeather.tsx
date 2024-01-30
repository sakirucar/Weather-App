import React from "react";

interface DailyWeatherProps {
  unit: string;
  weatherForecastData?: WeatherForecastModel;
  clickedIndex: number | null;
  setClickedIndex: (value: number | null) => void;
}

const DailyWeather = (props: DailyWeatherProps) => {
  const handleClick = (index: number) => {
    props.setClickedIndex(props.clickedIndex === index ? null : index);
  };
  return (
    <div className="flex cursor-pointer bg-red-300 gap-10 p-4">
      {props.weatherForecastData?.forecast.forecastday.map(
        (data, i: number) => (
          <div key={i} onClick={() => handleClick(i)} className="bg-blue-300 ">
            <div className="flex bg-green-300">
              {i === 0 ? "Today" : i === 1 ? "Tomorrow" : data.date}
            </div>
            <div className="flex">
              <img src={data.day.condition.icon} alt="" />
              <div className="flex flex-col justify-center bg-red-300">
                <div>
                  Max:
                  {props.unit === "Celcius"
                    ? ` ${data.day.maxtemp_c} °C`
                    : ` ${data.day.maxtemp_f} °F`}
                </div>
                <div>
                  Min:
                  {props.unit === "Celcius"
                    ? ` ${data.day.mintemp_c} °C`
                    : ` ${data.day.mintemp_f} °F`}
                </div>
              </div>
              <div
                className={`${
                  props.clickedIndex === i ? "flex items-center" : "hidden"
                }`}
              >
                {data.day.condition.text}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DailyWeather;
