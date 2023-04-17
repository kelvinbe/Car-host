import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabParamList, UpcomingParamList } from '../../../types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ReservationDetailsScreen from './ReservationDetailsScreen';
import UpcomingHomeScreen from './UpcomingHomeScreen';
import BaseTopBar from '../../../navigation/TopBar/BaseTopBar';
import VehicleInspection from './VehicleInspection';

type Props = BottomTabScreenProps<BottomTabParamList, 'Upcoming'>;

const UpcomingReservationsStack = createNativeStackNavigator<UpcomingParamList>();

const UpcomingScreen = () => {
  return (
      <UpcomingReservationsStack.Navigator initialRouteName="UpcomingReservationsHome">
        <UpcomingReservationsStack.Screen
          name="UpcomingReservationsHome"
          options={{
            header: props => <BaseTopBar home {...props} title="Upcoming Reservations" />,
          }}
          component={UpcomingHomeScreen}
        />
        <UpcomingReservationsStack.Screen
          name="ReservationDetails"
          options={{
            header: props => <BaseTopBar home={false} chevronLeft {...props} title="Your Reservation" />,
          }}
          component={ReservationDetailsScreen}
        />
        <UpcomingReservationsStack.Screen
          name="VehicleInspection"
          options={{
            header: props => (
              <BaseTopBar home={false} chevronLeft {...props} title="Vehicle Inspection" />
            ),
          }}
          component={VehicleInspection}
        />
      </UpcomingReservationsStack.Navigator>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({});
