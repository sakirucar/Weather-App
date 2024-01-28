import axios from "axios";
import useSWR from "swr";
import { baseUrl } from "@/configs/baseUrl";

interface ParamsType {
  key: string;
  q: string;
}

const useGetLocation = (params: ParamsType) => {
  const fetcher = async (url: string, params: ParamsType) => {
    const response = await axios.get(url, {
      params,
    });

    return response.data;
  };
  const { data, error, isLoading, mutate } = useSWR<LocationModel>(
    [baseUrl.weather_api_url + "/search.json", params],
    ([url, params]) => fetcher(url, params as ParamsType)
  );

  return { data, error, isLoading, mutate };
};

export default useGetLocation;
