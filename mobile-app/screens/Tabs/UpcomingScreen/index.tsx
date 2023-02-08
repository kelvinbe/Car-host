import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabParamList, UpcomingParamList } from '../../../types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ReservationDetailsScreen from './ReservationDetailsScreen';
import UpcomingHomeScreen from './UpcomingHomeScreen';

type Props = BottomTabScreenProps<BottomTabParamList, 'Upcoming'>;

const UpcomingReservationsStack = createNativeStackNavigator<UpcomingParamList>();

const UpcomingScreen = () => {
  return (
    <>
      <UpcomingReservationsStack.Navigator initialRouteName="UpcomingReservationsHome">
        <UpcomingReservationsStack.Screen
          name="UpcomingReservationsHome"
          options={{ headerShown: false }}
          component={UpcomingHomeScreen}
        />
        <UpcomingReservationsStack.Screen
          name="ReservationDetails"
          options={{
            headerShown: false,
          }}
          component={ReservationDetailsScreen}
        />
      </UpcomingReservationsStack.Navigator>
    </>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({});
