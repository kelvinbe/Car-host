import { StyleSheet, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@rneui/themed';
import Rounded from '../../../atoms/Buttons/Rounded/Rounded';
import RoundedOutline from '../../../atoms/Buttons/Rounded/RoundedOutline';
import BookingCarComponent from './BookingCarComponent';
import useBookingActions from '../../../../hooks/useBookingActions';
import useToast from '../../../../hooks/useToast';
import { setStatus, selectReservationStatus } from '../../../../store/slices/startReservationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { modifyCurrentReservation } from '../../../../store/slices/bookingSlice';
import { useAppDispatch } from '../../../../store/store';

interface IProps {
  openAuthorization?: () => void;
  openSelectPaymentMethod?: () => void;
  isReservation?: boolean;
  isCurrent?: boolean;
  openCancelReservation?: () => void;
  openModifyReservation?: () => void;
  openExtendReservation?: () => void;
  openEndReservation?: () => void;
  startedJourney?: () => void;
  navigateToVehicleInspection?: () => void;
}

type Props = IProps;

const useStyles = makeStyles((theme, props) => {
  return {
    container: {
      position: 'absolute',
      top: 120,
      width: '100%',
      paddingVertical: 10,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    divider: {
      marginVertical: 20,
      backgroundColor: theme.colors.stroke,
    },
    bottomSection: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };
});

const ReservationScreen = (props: Props) => {
  const styles = useStyles(props);
  const {bookingDetails} = useBookingActions()
  const toast = useToast()
  const dispatch = useAppDispatch()

  const checkTime = () => {
    const currentMonth = new Date().getMonth() 
    const currentDate = new Date().getDate()
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()
    
    let bookingMonth = new Date(bookingDetails.start_date_time).getMonth()
    let bookingDate = new Date(bookingDetails.start_date_time).getDate()
    let bookingHour = new Date(bookingDetails.start_date_time).getHours()
    let bookingMinute = new Date(bookingDetails.start_date_time).getMinutes()
    let endBookingHour = new Date(bookingDetails.end_date_time).getHours()
    let endBookingMinute = new Date(bookingDetails.end_date_time).getMinutes()
    if(currentMonth !== bookingMonth){
      toast({
        type:"error",
        title:"Failed",
        message:"This reservation is not booked for this month",
        duration:3000
      })
    }else if(currentDate !== bookingDate){
      toast({
        type:"error",
        title:"Failed",
        message:"This reservation is not booked for today",
        duration:3000
      })
    }else if(currentHour < bookingHour || (currentHour == bookingHour && currentMinute < bookingMinute)){
      toast({
        type:"error",
        title:"Failed",
        message:"Wait for the booked time or modify your ride",
        duration:3000
      })
    }else if(currentHour >= endBookingHour && currentMinute >= endBookingMinute){
      toast({
        type:"error",
        title:"Failed",
        message:"The current hour is past the dropoff time",
        duration:3000
      })
    }else if(currentHour >= bookingHour && currentMinute >= bookingMinute){
      dispatch(modifyCurrentReservation({
        status: "ACTIVE"
      }))
    }
  }

  return (
    <View style={styles.container}>
      <BookingCarComponent
        hasAuthorizationCode={props?.isReservation}
        hasLinkedCard={props?.isReservation}
        openAuthorizationCode={props?.openAuthorization}
        openSelectPaymentMethod={props?.openSelectPaymentMethod}
      />
      {props?.isCurrent ? (
        <View
          style={[
            styles.bottomSection,
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
          ]}>
          <RoundedOutline onPress={props?.openExtendReservation} width="40%">
            Extend
          </RoundedOutline>
          <Rounded onPress={props?.openEndReservation} width="40%">
            End
          </Rounded>
        </View>
      ) : (
        <View
          style={[
            styles.bottomSection,
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
          ]}>
          <RoundedOutline onPress={checkTime} width="40%">
            Start
          </RoundedOutline>
          <Rounded onPress={props?.openModifyReservation} width="40%">
            Modify
          </Rounded>
        </View>
      )}
    </View>
  );
};

export default ReservationScreen;

const styles = StyleSheet.create({});
