import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IStaticProps } from '../globaltypes'
import Layouts from '../layouts'

export default function App({ Component, pageProps }: AppProps<IStaticProps>) {
  return (
    <Layouts pageProps={pageProps} >
      <Component {...pageProps} />
    </Layouts>
  )
}
