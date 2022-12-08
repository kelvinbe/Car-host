import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@rneui/themed";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store from './store/store';
import { theme } from './utils/theme';
import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import ToastContainer from './components/organisms/Feedback/ToastContainer/ToastContainer';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,

} from '@expo-google-fonts/lato';
import Loading from './components/molecules/Feedback/Loading/Loading';
import { initializeApp } from 'firebase/app';
import LogRocket from '@logrocket/react-native';
import { LOGROCKET_ID, STRIPE_PUBLISHABLE_KEY } from '@env';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { isEmpty } from 'lodash';
import { StripeProvider } from '@stripe/stripe-react-native';


 function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user] = useAuthState(getAuth())

  useEffect(()=>{
    if(!isEmpty(user)){
      LogRocket.identify(user.uid, {
        name: user.displayName || "user",
        email: user.email || "user",
      })
    }
  }, [user])

  useEffect(()=>{
    LogRocket.init(LOGROCKET_ID)
  }, [])

  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic
  });
  
  if (!isLoadingComplete) {
    return (
      <ThemeProvider theme={theme} >
        <Loading/>
      </ThemeProvider>
    )
  } else if (!fontsLoaded) {
    return (
      <ThemeProvider theme={theme} >
        <Loading/>
      </ThemeProvider>
    )
  } else{
    return (
      <Provider store={store}>
        <StripeProvider 
            publishableKey={STRIPE_PUBLISHABLE_KEY} 
            //@TODO: add merchant id when available
        >
        <ThemeProvider theme={theme} >
          <SafeAreaProvider>
          {/* <StatusBar backgroundColor={theme.lightColors?.white} style="dark" /> */}
            {/* <SafeAreaView style={{width: "100%", height: "100%"}}> */}
              <Navigation colorScheme={colorScheme} />
              
            {/* </SafeAreaView> */}
            <ToastContainer/>
          </SafeAreaProvider>
        </ThemeProvider>
        </StripeProvider>
      </Provider>
    );
  }
}

export default gestureHandlerRootHOC(App);
