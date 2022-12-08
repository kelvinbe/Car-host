import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationContainerRef, useNavigationContainerRef, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Platform } from 'react-native';
import NotFoundScreen from '../screens/Stacks/NotFoundScreen';
import StorybookScreen from '../screens/Tabs/StorybookScreen';
import { BottomTabParamList, RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screens/Stacks/LoginScreen';
import RegisterScreen from '../screens/Stacks/RegisterScreen';
import ForgotPasswordScreen from '../screens/Stacks/ForgotPasswordScreen';
import HistoryScreen from '../screens/Tabs/HistoryScreen';
import HistoryIcon from "../assets/icons/history.svg";
import { ThemeConsumer } from '@rneui/themed';
import UpcomingScreen from '../screens/Tabs/UpcomingScreen';
import ReservedIcon from "../assets/icons/reserved.svg";
import ProfileScreen from '../screens/Tabs/ProfileScreen';
import UserIcon from "../assets/icons/user.svg";	
import ManageResScreen from '../screens/Tabs/ManageResScreen';
import ManageIcon from "../assets/icons/manage.svg";
import WarningIcon from "../assets/icons/warning.svg";
import IssuesScreen from '../screens/Tabs/IssuesScreen';
import BookIcon from "../assets/icons/book.svg"
import { makeStyles, Text, Theme } from '@rneui/base';
import _SearchScreen from '../screens/Tabs/SearchScreen/SearchScreen';
import SearchScreen from '../screens/Tabs/SearchScreen';
import { hideBottomNav, selectDisplayBottomNav, selectNavState, selectPreviousScreen, setNavScreens, showBottomNav } from '../store/slices/navigationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/slices';
import { setBackgroundColorAsync, setVisibilityAsync } from "expo-navigation-bar"
import ClockIcon from "../assets/icons/clock.svg";
import BaseTopBar from './TopBar/BaseTopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmationSentScreen from '../screens/Stacks/ConfirmationSentScreen';
import VerificationScreen from '../screens/Stacks/VerificationScreen';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const ScreensWithNoBottomNav = [
    "BookingConfirmationScreen",
    "ProfileScreenEdit",
    "PaymentDetailsScreenHome",
    "MPesaDetailsScreen",
    "ProfileSettingsScreen",
    "MapScreen",
    "BookingDetails"
]

const ScreensWithNoTopBar = [
  "SearchScreenHome"
]



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = React.useRef<any>()
  const dispatch = useDispatch();
  const onReadyHandler = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name
  }
  const onStateChangeHandler = async () => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = navigationRef.getCurrentRoute()?.name
    if (previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName
      dispatch(setNavScreens({
        current: currentRouteName,
        previous: previousRouteName
      }))
    }
  }
  return (
    <NavigationContainer 
      onReady={onReadyHandler}
      ref={navigationRef}
      onStateChange={onStateChangeHandler} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [showTopNav, setShowTopNav] = React.useState(false)
  const [currentScreen, previousScreen] = useSelector(selectNavState)
  

  React.useEffect(() => {
    if(ScreensWithNoTopBar?.includes(currentScreen)){
      setShowTopNav(false)
    }
    if(!ScreensWithNoTopBar?.includes(currentScreen)){
      setShowTopNav(true)
    }
  }, [currentScreen, previousScreen])

  React.useEffect(() => {
    if(Platform.OS === "android"){
      setBackgroundColorAsync("white")
    }else {
      // I'm yet to find an ios alternative for changing the bottom status bar color
    }
    
  }, [])
  return (
    <SafeAreaView edges={showTopNav ? [
      "top",
      "bottom",
      "left",
      "right"
    ] : [
      "bottom",
      "left",
      "right"
    ]} style={{
      width: "100%",
      height: "100%",
    }}  >
      <Stack.Navigator initialRouteName='Register' >
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}  />
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}  />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}   />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}   />
        <Stack.Screen name="ConfirmationSent" component={ConfirmationSentScreen} options={{headerShown: false}}   />
        <Stack.Screen name="Verification" component={VerificationScreen} options={{headerShown: false}}   />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const Tabs = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  const displayBottomNav = useSelector(selectDisplayBottomNav)
  const [currentScreen, previousScreen] = useSelector(selectNavState)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let theme: Theme;
  makeStyles((_theme: Theme)=>{
    theme = _theme
  })

  React.useEffect(() => {
    if(Platform.OS === "android"){
      setBackgroundColorAsync("white")
    }else {
      // I'm yet to find an ios alternative for changing the bottom status bar color
    }
    
  }, [])

  React.useEffect(()=>{
    if(ScreensWithNoBottomNav.includes(previousScreen)){
      dispatch(showBottomNav())
      // setVisibilityAsync("visible")
    }
    if(
      ScreensWithNoBottomNav.includes(currentScreen)
    ){
      dispatch(hideBottomNav())
      // doesnt seem to have any effect 👉 setVisibilityAsync("hidden")
    }
  }, [previousScreen, currentScreen])

    const [user] = useAuthState(getAuth())

    if(!user){
      navigation.navigate("Login", {})
    }

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <Tabs.Navigator screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: theme.colors.white,
            borderTopColor: theme.colors.background,
            elevation: 5,
            display: displayBottomNav ? "flex" : "none",
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.grey0
          
        }} initialRouteName='SearchScreen' >
          <Tabs.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              headerShown: false,
              tabBarButton: () => <>
              </>,
            }}
          />
          <Tabs.Screen
            name="Storybook"
            component={StorybookScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (
                <BookIcon width={24} height={24} fill={ focused ? theme.colors.primary:  theme.colors.grey0?.trim()}  />
              ),
              title: "Storybook",
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: theme.colors.grey0,
              
            }}
          />
          <Tabs.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<ClockIcon width={24} height={24} fill={ focused ?theme.colors.primary:  theme.colors.grey0?.trim()}  />),
              title: "History",
              header: (props) => <BaseTopBar {...props} title="History" />,
              
            }}
        
          />
          <Tabs.Screen
            name="Upcoming"
            component={UpcomingScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<ReservedIcon width={24} height={24} fill={focused ? theme.colors.primary : theme.colors.grey0?.trim()}  />),
              headerShown: false,
              title: "Upcoming"
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<UserIcon width={24} height={24} fill={focused ? theme.colors.primary : theme.colors.grey0?.trim()}  />),
              headerShown: false,
              title: "Profile"
            }}
          />
          <Tabs.Screen
            name="ManageRes"
            component={ManageResScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<ManageIcon width={24} height={24} fill={focused ? theme.colors.primary : theme.colors.grey0?.trim()}  />),
              title: "Manage Res",
              header: (props) => <BaseTopBar {...props} title="Manage Reservations" />,
              headerShown: false
            }}
          />
          <Tabs.Screen
            name="Issues"
            component={IssuesScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<WarningIcon width={24} height={24} fill={focused ? theme.colors.primary : theme.colors.grey0?.trim()}  />),
              title: "Issues",
              header: (props) => <BaseTopBar {...props} title="Report Issues" />,
            }}
          />
        </Tabs.Navigator>
      )}
    </ThemeConsumer>
    
  );
}
