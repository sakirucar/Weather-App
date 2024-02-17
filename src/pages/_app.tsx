import type { AppProps } from 'next/app'
import { swrDefaultValues } from '@/configs/swr'
import { SWRConfig } from 'swr'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={swrDefaultValues}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
