import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { makeStyles } from '@rneui/themed';
import Rounded from '../../../atoms/Buttons/Rounded/Rounded';
import RoundedOutline from '../../../atoms/Buttons/Rounded/RoundedOutline';
import BookingCarComponent from './BookingCarComponent';
import { useNavigation } from '@react-navigation/native';
import BookingScreen from './BookingScreen';

interface IProps {
  openAuthorization?: () => void;
  openSelectPaymentMethod?: () => void;
  isReservation?: boolean;
  isUpcoming?: boolean;
  isCurrent?: boolean;
  openCancelReservation?: () => void;
  openModifyReservation?: () => void;
  openExtendReservation?: () => void;
  openEndReservation?: () => void;
  startedJourney?: () => void;
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
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <BookingCarComponent
        hasAuthorizationCode={props?.isReservation}
        hasLinkedCard={props?.isReservation}
        openAuthorizationCode={props?.openAuthorization}
        openSelectPaymentMethod={props?.openSelectPaymentMethod}
      />
      {props?.isUpcoming ? (
        <View
          style={[
            styles.bottomSection,
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
          ]}>
          <RoundedOutline onPress={props?.startedJourney} width="40%">
            Start
          </RoundedOutline>
          <Rounded onPress={props?.openModifyReservation} width="40%">
            Modify
          </Rounded>
        </View>
      ) : props?.isCurrent ? (
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
        <Rounded width="40%">Make reservation</Rounded>
      )}
    </View>
  );
};

export default ReservationScreen;

const styles = StyleSheet.create({});
