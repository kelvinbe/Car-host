import { StyleSheet, View } from 'react-native';
import React, {useState} from 'react';
import { makeStyles } from '@rneui/themed';
import Rounded from '../../../atoms/Buttons/Rounded/Rounded';
import RoundedOutline from '../../../atoms/Buttons/Rounded/RoundedOutline';
import BookingCarComponent from './BookingCarComponent';
import useBookingActions from '../../../../hooks/useBookingActions';
import useToast from '../../../../hooks/useToast';
import { setStatus, selectReservationStatus } from '../../../../store/slices/startReservationSlice';
import { useDispatch, useSelector } from 'react-redux';

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
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
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
  const dispatch = useDispatch()
  
  let currentDayTime = new Date()

  const currentMonth = String(currentDayTime.getMonth() + 1).split("").length === 1 ? Number(`0${currentDayTime.getMonth() + 1}`) : Number(`${currentDayTime.getMonth() + 1}`)
  const currentDate = Number(`${currentDayTime.getDate()}`)
  const currentHour = Number(`${currentDayTime.getHours()}`)
  const currentMinute = String(currentDayTime.getMinutes() + 1).split("").length === 1 ? Number(`0${currentDayTime.getMinutes() + 1}`) : Number(`${currentDayTime.getMinutes() + 1}`) 
  
  let bookingMonth = Number(`${bookingDetails.startDateTime.split("")[5]}${bookingDetails.startDateTime.split("")[6]}`)
  let bookingDate = Number(`${bookingDetails.startDateTime.split("")[8]}${bookingDetails.startDateTime.split("")[9]}`)
  let bookingHour = Number(`${bookingDetails.startDateTime.split("")[11]}${bookingDetails.startDateTime.split("")[12]}`)
  let bookingMinute = Number(`${bookingDetails.startDateTime.split("")[14]}${bookingDetails.startDateTime.split("")[15]}`)
  let endBookingHour = Number(`${bookingDetails.endDateTime.split("")[11]}${bookingDetails.endDateTime.split("")[12]}`)
  let endBookingMinute = Number(`${bookingDetails.endDateTime.split("")[14]}${bookingDetails.endDateTime.split("")[15]}`)

  const reservationStatus = useSelector(selectReservationStatus)

  const checkTime = () => {
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
      dispatch(setStatus())
    }
  }
  reservationStatus === 'Ongoing' && props?.navigateToVehicleInspection
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
