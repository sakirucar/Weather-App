import { apiKey } from "@/constants";
import useGetWeatherForecast from "@/services/deneme/hooks/useGetWeatherForecast";

export default function Home() {
  const { data } = useGetWeatherForecast({
    key: apiKey,
    q: "Eskisehir",
    days: 3,
    aqi: false,
    alerts: false,
  });
  console.log(data?.current.temp_c);

  return <div className="bg-red-500">Hava proje deneme</div>;
}
