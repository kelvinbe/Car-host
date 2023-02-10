import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { makeStyles, ThemeConsumer } from '@rneui/themed';
import LocationIcon from '../../../assets/icons/location.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import ClockIcon from '../../../assets/icons/clock.svg';
import { Divider, Image } from '@rneui/base';
import { IReservation } from '../../../types';
import dayjs from 'dayjs';

interface IProps {
  customStyle?: StyleProp<ViewStyle>;
  onDetailsPress?: (reservationId: string) => void;
}

type Props = IProps & IReservation;

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    padding: 20,
    borderRadius: 15,
    borderColor: theme.colors.stroke,
    borderWidth: 1,
    width: '100%',
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dateText: {
    color: theme.colors.grey3,
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    marginLeft: 10,
  },
  link: {
    color: theme.colors.link,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
  },
  divider: {
    width: '100%',
    backgroundColor: theme.colors.stroke,
    marginVertical: 10,
  },
  rideInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rideInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  vehicle: {
    width: 70,
    height: 70,
    borderRadius: 15,
    borderColor: theme.colors.stroke,
    overflow: 'hidden',
    marginRight: 10,
  },
  vehicleImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
  vehicleInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Lato_700Bold',
    color: theme.colors.black,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  driverImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 10,
  },
  driverName: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Lato_700Bold',
    color: theme.colors.black,
  },
  locationInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  locationIcon: {
    width: 10,
    height: 7,
    color: theme.colors.grey3,
  },
  locationInfo: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
    color: theme.colors.grey3,
    marginLeft: 10,
  },
  ridePrice: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Lato_700Bold',
    color: theme.colors.black,
  },
  rideTimeInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rideTimeInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
  },
  rideTimeTitleInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rideTimeInfoTitle: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
    color: theme.colors.black,
    marginLeft: 5,
  },
  rideTimeInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Lato_700Bold',
    color: theme.colors.grey3,
    marginTop: 10,
  },
}));

const HistoryCard = (props: Props) => {
  const {
    customer,
    vehicle,
    duration,
    end_date_time,
    payment_id,
    start_date_time,
    status,
    total_cost,
    customStyle,
    reservation_id,
    onDetailsPress,
  } = props;
  const styles = useStyles(props);

  const onPress = () => {
    reservation_id && onDetailsPress && onDetailsPress(reservation_id);
  };
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <TouchableOpacity style={[styles.container, props.customStyle]}>
          <View style={styles.topSection}>
            <View style={styles.date}>
              <CalendarIcon
                stroke={theme.colors.primary}
                fill={theme.colors.primary}
                width={12}
                height={12}
                color={theme.colors.primary}
              />
              <Text style={styles.dateText}>{dayjs(start_date_time).format('DD MMM YYYY')}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.link}>Details</Text>
            </TouchableOpacity>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rideInfo}>
            <View style={styles.rideInfoLeft}>
              <View style={styles.vehicle}>
                <Image
                  style={styles.vehicleImage}
                  source={{
                    uri: vehicle?.vehicle_pictures?.[0],
                  }}
                />
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>
                  {vehicle?.make} {vehicle?.model} {vehicle?.year}
                </Text>
                <View style={styles.driverInfo}>
                  <Image
                    style={styles.driverImage}
                    source={{
                      uri: vehicle?.host?.profile_pic_url,
                    }}
                  />
                  <Text style={styles.driverName}>{`${vehicle?.host?.handle}`}</Text>
                </View>
                <View style={styles.locationInfoContainer}>
                  <LocationIcon stroke={theme.colors.stroke} style={styles.locationIcon} />
                  <Text style={styles.locationInfo}>{`${vehicle?.location?.address}`}</Text>
                </View>
              </View>
              <Text style={styles.ridePrice}>${total_cost}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rideTimeInfoContainer}>
            <View style={styles.rideTimeInfo}>
              <View style={styles.rideTimeTitleInfoContainer}>
                <ClockIcon width={12} height={12} fill={theme.colors.primary} />
                <Text style={styles.rideTimeInfoTitle}>Pickup Time:</Text>
              </View>
              <Text style={styles.rideTimeInfoValue}>
                {dayjs(start_date_time).format('hh:mm A')}
              </Text>
            </View>
            <View style={styles.rideTimeInfo}>
              <View style={styles.rideTimeTitleInfoContainer}>
                <ClockIcon width={12} height={12} fill={theme.colors.primary} />
                <Text style={styles.rideTimeInfoTitle}>Dropoff Time:</Text>
              </View>
              <Text style={styles.rideTimeInfoValue}>{dayjs(end_date_time).format('hh:mm A')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </ThemeConsumer>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({});
