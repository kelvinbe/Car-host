import { Text, View } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import { makeStyles, ThemeConsumer } from '@rneui/themed';
import MapView, { Circle } from 'react-native-maps';
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';
import * as Location from 'expo-location';
import LocationMarker from '../../../components/atoms/GeoMarkers/LocationMarker/LocationMarker';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import useBookingActions from '../../../hooks/useBookingActions';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { searchLocally, selectCoords } from '../../../store/slices/searchSlice';

const useStyles = makeStyles(theme => ({
  map: {
    width: '100%',
    height: '100%',
  },
  statusContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
    width: '100%',
  },
  loadingText: {
    color: theme.colors.title,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
  },
}));

interface IState {
  location: Location.LocationObject | null;
  errorMessage: null | string;
  loading?: boolean;
  hostCode?: string;
}
// change initialState when location bug is dealt with
const initialState: IState = {
  location: {
    coords: {
      latitude: 37.78825,
      longitude: -122.4324,
    } as any,
  } as any,
  errorMessage: null,
  loading: false,
  hostCode: '',
};

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case 'setLocation':
      return {
        ...state,
        location: action.payload,
        loading: false,
      };
    case 'setErrorMessage':
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const ReservationMap = () => {
  const [state, dispatchAction] = useReducer(reducer, initialState);
  const styles = useStyles();
  const { clearBookingState } = useBookingActions();
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectCoords)

  const getCoords = async () => {
    Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    })
      .then(location => {
        console.log(location);
        dispatchAction({
          type: 'setLocation',
          payload: location,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    dispatch(searchLocally())
    return () => {
      clearBookingState();
    };
  }, []);

  return (
    <ThemeConsumer>
      {({ theme }) =>
        state.loading ? (
          <View style={[styles.statusContainer]}>
            <Text style={[styles.loadingText]}>Loading...</Text>
            <Rounded onPress={getCoords}>Refetch</Rounded>
          </View>
        ) : state.errorMessage ? (
          <View style={styles.statusContainer}>
            <Text style={styles.errorText}>{state.errorMessage}</Text>
          </View>
        ) : (
          <View>
            <View>
              {data?.loading && (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: data?.data?.latitude || 0,
                    longitude: data?.data?.longitude || 0,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}>
                  <Circle
                    center={{
                      latitude: data?.data?.latitude || 0,
                      longitude: data?.data?.longitude || 0,
                    }}
                    radius={5000}
                    strokeColor={theme.colors.primary}
                    fillColor={theme.colors.fadedPrimary}
                  />
                  {data?.data && (
                    <LocationMarker
                      location={data?.data}
                      title="Current Location"
                      description="This is your current location"
                    />
                  )}
                </MapView>
              )}
            </View>
          </View>
        )
      }
    </ThemeConsumer>
  );
};

export default ReservationMap;
