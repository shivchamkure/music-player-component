import '@/styles/globals.css'
import type { AppProps } from 'next/app' 
import '../Musicplayer/Record/record.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
