import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import HomeScreen from '../screens/Tabs/HomeScreen';
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

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Login' >
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}  />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}  />
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}   />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}   />
    </Stack.Navigator>
  );
}

const Tabs = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <Tabs.Navigator screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: theme.colors.primary,
        }} initialRouteName='HomeScreen' >
          <Tabs.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarButton: () => <></>
            }}
          />
          <Tabs.Screen
            name="Storybook"
            component={StorybookScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (
                <BookIcon width={24} height={24} fill={ focused ? color:  theme.colors.iconPrimary}  />
              ),
              title: "Storybook"
            }}
          />
          <Tabs.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<HistoryIcon width={24} height={24} fill={ focused ? color:  theme.colors.iconPrimary}  />),
              headerShown: false,
              title: "History"
            }}
        
          />
          <Tabs.Screen
            name="Upcoming"
            component={UpcomingScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<ReservedIcon width={24} height={24} fill={focused ? color : theme.colors.iconPrimary}  />),
              headerShown: false,
              title: "Upcoming"
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<UserIcon width={24} height={24} fill={focused ? color : theme.colors.iconPrimary}  />),
              headerShown: false,
              title: "Profile"
            }}
          />
          <Tabs.Screen
            name="ManageRes"
            component={ManageResScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<ManageIcon width={24} height={24} fill={focused ? color : theme.colors.iconPrimary}  />),
              headerShown: false,
              title: "Manage Res"
            }}
          />
          <Tabs.Screen
            name="Issues"
            component={IssuesScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (<WarningIcon width={24} height={24} fill={focused ? color : theme.colors.iconPrimary}  />),
              headerShown: false,
              title: "Issues"
            }}
          />
        </Tabs.Navigator>
      )}
    </ThemeConsumer>
    
  );
}
