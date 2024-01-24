import axios from "axios";
import useSWR from "swr";
import { baseUrl } from "@/configs/baseUrl";

interface ParamsType {
  key: string;
  q: string;
  days: number;
  aqi: boolean;
  alerts: boolean;
}

const useGetWeatherForecast = (params: ParamsType) => {
  const fetcher = async (url: string) => {
    const response = await axios.get(url, {
      params,
      headers: { "Accept-Language": "tr" },
    });

    return response.data;
  };
  const { data, error, isLoading, mutate } = useSWR<WeatherForecastModel>(
    baseUrl.weather_api_url + "/forecast.json",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useGetWeatherForecast;
