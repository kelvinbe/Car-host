import { View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { UpcomingParamList } from '../../../types';
import { makeStyles } from '@rneui/themed';
import HistoryCard from '../../../components/molecules/HistoryCard/HistoryCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetReservationsQuery } from '../../../store/slices/reservationSlice';
import Loading from '../../../components/molecules/Feedback/Loading/Loading';
import Error from '../../../components/molecules/Feedback/Error/Error';
import Empty from '../../../components/molecules/Feedback/Empty/Empty';
import { useAppDispatch} from '../../../store/store';
import { loadBookingDetailsFromReservation } from '../../../store/slices/bookingSlice';
import { useFetchUpcoming } from '../../../hooks';
import { selectUpcoming } from '../../../store/slices/upcomingReservationSlice';

type Props = NativeStackScreenProps<UpcomingParamList, 'UpcomingReservationsHome'>;

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  flatListContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
}));

const UpcomingHomeScreen = (props: Props) => {
  const {data, loading, error, fetchUpcoming} = useFetchUpcoming()

  const [isLoading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const styles = useStyles(props);
  const reduxDispatch = useAppDispatch();
  /**
   * @name onCardDetailsPress
   * @description This function is called when the user presses the details button on a reservation card, it loads the booking details from the reservation id into the redux store
   * @param reservationId
   */
  const onCardDetailsPress = (reservationId: string) => {
    setLoading(true);
    setFetchError(false);
    reduxDispatch(loadBookingDetailsFromReservation(reservationId))
      .unwrap()
      .then(result => {
        setLoading(false);
        props.navigation.navigate('ReservationDetails');
      })
      .catch(e => {
        setLoading(false);
        setFetchError(true);
      });
  };

  useEffect(() => {
    fetchUpcoming()
  },[])
  return isLoading || loading ? (
    <Loading />
  ) : error || fetchError ? (
    <Error />
  ) : (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={<Empty emptyText="No reservations yet!" />}
        style={styles.flatListContainer}
        data={data ? data : []}
        renderItem={({ item }) => (
          <HistoryCard
            {...item}
            onDetailsPress={onCardDetailsPress}
            customStyle={{
              marginBottom: 20,
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default UpcomingHomeScreen;
