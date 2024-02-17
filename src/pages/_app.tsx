import { swrDefaultValues } from "@/configs/swr";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={swrDefaultValues}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
