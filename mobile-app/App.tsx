import React, { useEffect, useRef, useState  } from 'react';
import { View, Text, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
// import LogRocket from '@logrocket/react-native';
import { LOGROCKET_ID, STRIPE_PUBLISHABLE_KEY } from '@env';
import { StripeProvider } from '@stripe/stripe-react-native';
import { auth } from './firebase/firebaseApp';
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { useDispatch, useSelector } from 'react-redux';
import { saveExpoToken, selectExpoToken } from './store/slices/notificationsSlice';
import { setAddNotification } from './store/slices/notificationsSlice';
import useFetchNotifications from './hooks/useFetchNotifications';
import axios from 'axios';
import { SEND_NOTIFICATION_TOKEN_ENDPOINT } from './hooks/constants';
import useToast from './hooks/useToast';
import { onAuthStateChanged, User } from 'firebase/auth';
import { isNull } from 'lodash';

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const registerForPushNotificationsAsync = () => {

    return new Promise(async (resolve, reject)=>{
      let token;
    
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          sound:'default',
          lightColor: "#FF231F7C",
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
          bypassDnd: true,
        });
      }
    
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return reject('Permission denied!');
        
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      return resolve(token)
    })
    
  }

  const StatefullApp = () => {
    const colorScheme = useColorScheme();
    // the return type of either of these functions doesnt seem to be explicitly exported so will use this instead
    const notificationListener = useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();
    const responseListener = useRef<ReturnType<typeof Notifications.addNotificationResponseReceivedListener>>();

    const dispatch = useDispatch()
    const expoToken = useSelector(selectExpoToken)

    const {data} = useFetchNotifications()
    const toast = useToast()

    useEffect( () => {
      data && Notifications.scheduleNotificationAsync({
        content: {
          title: data?.[0]?.title,
          body: data?.[0]?.message,
        },
        trigger: null,
      });
  
      if (expoToken === ''){
        registerForPushNotificationsAsync()
        .then(token => dispatch(saveExpoToken(token)))
        .catch(err => toast({
          message: err,
          type: 'error',
          duration: 3000,
        }))
      }  
      axios.post(
        SEND_NOTIFICATION_TOKEN_ENDPOINT,
        {
          notificationToken:expoToken
        },
      )
      .then((response) => {
        return response.data.message
      })
      .catch(err => {
        return err
      })
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        dispatch(setAddNotification(notification))
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        dispatch(setAddNotification(response.notification))
      });
  
      return () => {
        notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [data]);
  
    return (
      <Navigation colorScheme={colorScheme} />
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
    );
  }
}

export default gestureHandlerRootHOC(App);
