import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { makeStyles, ThemeConsumer } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VisaIcon from '../../../assets/icons/visa.svg';
import useBookingActions from '../../../hooks/useBookingActions';
import { calcDuration } from '../../../utils/utils';
import { isNull } from 'lodash';

interface IProps {
  openSelectPaymentMethod?: () => void;
  hasLinkedCard?: boolean;
}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props) => {
  return {
    container: {
      width: '100%',
      paddingHorizontal: 18,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      fontWeight: '700',
      fontFamily: 'Lato_700Bold',
      fontSize: 14,
      color: theme.colors.black,
    },
    actionButton: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primary,
    },
    actionButtonText: {
      fontWeight: '500',
      fontFamily: 'Lato_400Regular',
      fontSize: 14,
      color: theme.colors.primary,
    },
    paymentInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textInfo: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: 'Lato_700Bold',
      color: theme.colors.black,
      marginLeft: 10,
    },
  };
});

const BookingCarPaymentInfo = (props: Props) => {
  const styles = useStyles(props);
  const {
    bookingDetails: { vehicle, startDateTime, endDateTime, billingInfo },
  } = useBookingActions();

  const calcAmount = () => {
    if (isNull(vehicle)) return 0;
    return calcDuration(startDateTime, endDateTime) * vehicle?.hourly_rate;
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total</Text>
            {billingInfo && (
              <TouchableOpacity
                onPress={props.openSelectPaymentMethod}
                style={[styles.actionButton, , { borderBottomColor: theme.colors.link }]}>
                <Text style={[styles.actionButtonText, { color: theme.colors.link }]}>Change</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.section, { justifyContent: 'space-between' }]}>
            <Text style={styles.sectionTitle}>${calcAmount()}</Text>
            {!billingInfo && (
              <TouchableOpacity
                onPress={props.openSelectPaymentMethod}
                style={[styles.actionButton]}>
                <Text style={styles.actionButtonText}>Select Payment Method</Text>
              </TouchableOpacity>
            )}

            {billingInfo && (
              <View style={styles.paymentInfoContainer}>
                <VisaIcon width={32} height={24} />
                {billingInfo?.details?.last4 && (
                  <Text style={styles.textInfo}>****{billingInfo.details.last4}</Text>
                )}
              </View>
            )}
          </View>
        </View>
      )}
    </ThemeConsumer>
  );
};

export default BookingCarPaymentInfo;

const styles = StyleSheet.create({});
