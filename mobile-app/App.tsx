import React, { useEffect, useRef, useState  } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@rneui/themed";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store, { useAppDispatch, useAppSelector } from './store/store';
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
// import LogRocket from '@logrocket/react-native';
import { LOGROCKET_ID, STRIPE_PUBLISHABLE_KEY } from '@env';
import { StripeProvider } from '@stripe/stripe-react-native';
import { auth } from './firebase/firebaseApp';
import * as Notifications from 'expo-notifications'
import { useDispatch } from 'react-redux';
import { saveExpoToken, selectExpoToken, setAddNotification } from './store/slices/notificationsSlice';
import { User, onAuthStateChanged } from 'firebase/auth';
import { isEmpty, isNull } from 'lodash';
import useNotifications from './hooks/useNotifications';
import * as Linking from 'expo-linking'
import { fetchOnboarding } from './store/slices/onBoardingSlice';
import useUserAuth from './hooks/useUserAuth';
import ErrorBoundary from './components/ErrorHandler/ErrorBoundary';
  

  



  const StatefullApp = () => {
    const { registerForPushNotificationsAsync, updatePushToken, goToBooking } = useNotifications()
  const { logOut: _logOut, userProfile } = useUserAuth();

    // the return type of either of these functions doesnt seem to be explicitly exported so will use this instead
    const notificationListener = useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();
    const responseListener = useRef<ReturnType<typeof Notifications.addNotificationResponseReceivedListener>>();
    const token = useAppSelector(selectExpoToken)
    const dispatch = useAppDispatch()
    const [user, setUser] = useState<User|null>(null)

    useEffect(()=>{
      if(isEmpty(user?.uid)) return undefined
      dispatch(fetchOnboarding())
    }, [,user?.uid])


    /**
     * @explanation to prevent stale push tokens, we will update the user's push token on every login
     */
    onAuthStateChanged(auth, (user)=>{
      if(!isNull(user)){
        setUser(user)
        if (isEmpty(token)){
          registerForPushNotificationsAsync().then(async (token)=>{
            dispatch(saveExpoToken(token))
            await updatePushToken(token, 0)
          }).catch((e)=>{
            /**
             * @todo - this error's priority is low and shouldn't prevent the user from continuing, so we can just log it for now,
             *        - logrocket will come in handy here
             */
          })
        }
      }
    })

    useEffect( () => {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        dispatch(setAddNotification(notification))
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        const data = response.notification.request.content.data as Record<string, any>
        const notification_type = data.type
        switch (notification_type) {
          case "auth_code_activated": 
            goToBooking({
              vehicle_id: data.vehicle_id,
              host_id: data.host_id,
              code: data.code,
            }, data.link)
            break;
          default:
            break;
        }
        dispatch(setAddNotification(response.notification))
      });
  
      return () => {
        notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    return (
      <Navigation colorScheme={"light"} />
    )
  }

 function App() {
  const isLoadingComplete = useCachedResources();
  
  

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
        <Loading fontLoaded={false} />
      </ThemeProvider>
    )
  } else if (!fontsLoaded) {
    return (
      <ThemeProvider theme={theme} >
        <Loading fontLoaded={false} />
      </ThemeProvider>
    )
  } else{
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <StripeProvider 
              publishableKey={STRIPE_PUBLISHABLE_KEY} 
              //@TODO: add merchant id when available
          >
          <ThemeProvider theme={theme} >
            <SafeAreaProvider>
            {/* <StatusBar backgroundColor={theme.lightColors?.white} style="dark" /> */}
              {/* <SafeAreaView style={{width: "100%", height: "100%"}}> */}
                <StatefullApp/>
                
              {/* </SafeAreaView> */}
              <ToastContainer/>
            </SafeAreaProvider>
          </ThemeProvider>
          </StripeProvider>
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default gestureHandlerRootHOC(App);
