import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IStaticProps } from '../globaltypes'
import Layouts from '../layouts'
import { theme } from '../utils/theme'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps<IStaticProps>) {
  return (
    <ChakraProvider theme={theme} >
    <Layouts pageProps={pageProps} >
      <Component {...pageProps} />
    </Layouts>
    </ChakraProvider>
  )
}
