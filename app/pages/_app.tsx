import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IStaticProps } from '../globaltypes'
import Layouts from '../layouts'
import { theme } from '../utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Head from 'next/head'
import LogRocket from 'logrocket';
import React, {useEffect} from 'react'

export default function App({ Component, pageProps }: AppProps<IStaticProps>) {
  useEffect(()=>{
    LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID as string,{
      console: {
        isEnabled: false,
      },
    });
    LogRocket.getSessionURL((sessionURL)=>{

    })
  },[])
  return (
    <Provider store={store} >
      <ChakraProvider theme={theme} >
      <Layouts pageProps={pageProps} >
      <Head>
        <title>Divvly</title>
        <meta name="description" content="Divvly allows AirBnB hosts rent cars to their tenants." />
        <meta property="og:title" content="Divvly" />
        <meta property="og:description" content="Divvly allows AirBnB hosts rent cars to their tenants." />
      </Head>
        <Component {...pageProps} />
      </Layouts>
      </ChakraProvider>
    </Provider>
  )
}
