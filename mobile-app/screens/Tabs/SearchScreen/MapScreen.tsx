import { Text, View } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { makeStyles, ThemeConsumer } from '@rneui/themed';
import MapView, { Circle } from 'react-native-maps';
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';
import * as Location from 'expo-location';
import LocationMarker from '../../../components/atoms/GeoMarkers/LocationMarker/LocationMarker';
import TimeFilter from '../../../components/molecules/TimeFilter/TimeFilter';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchScreenParamList } from '../../../types';
import MapScreenBottomSheet from '../../../components/organisms/MapScreenBottomSheet/MapScreenBottomSheet';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import useBookingActions from '../../../hooks/useBookingActions';
import { first, isUndefined } from 'lodash';
import { timeTilEndOfDay } from '../../../utils/utils';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setLocation } from '../../../store/slices/bookingSlice';
import { selectCoords } from '../../../store/slices/searchSlice';

interface IProps {
  inReservation?: boolean;
}

type Props = IProps & NativeStackScreenProps<SearchScreenParamList, 'MapScreen'>;

const useStyles = makeStyles((theme, props) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: theme.colors.white,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
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

const MapScreen = (props: Props) => {
  const [state, dispatchAction] = useReducer(reducer, initialState);
  const styles = useStyles();
  const { clearBookingState } = useBookingActions();
  const { setStartDateTime, setEndDateTime } = useBookingActions();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()
  const {data: coords, loading} = useAppSelector(selectCoords)
  
 
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isUndefined(props.inReservation)) {
      const times = timeTilEndOfDay();
      try {
        setStartDateTime(dayjs(first(times)?.value).toISOString());
        setEndDateTime(dayjs(first(times)?.value).toISOString());

      } catch (e) {
        console.log("Here is the error::", e)
      }
    }
  }, [props.inReservation]);

  useEffect(() => {
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
            {/* <Rounded onPress={getCoords}>Refetch</Rounded> */}
          </View>
        ) : state.errorMessage ? (
          <View style={styles.statusContainer}>
            <Text style={styles.errorText}>{state.errorMessage}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.mapContainer}>
             
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  // mapType="mutedStandard"
                  initialRegion={{
                    latitude: coords?.latitude || 0,
                    longitude: coords?.longitude || 0,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  >
                  <Circle
                    center={{
                      latitude: coords?.latitude || 0,
                      longitude: coords?.longitude || 0,
                    }}
                    radius={500}
                    strokeColor={theme.colors.primary}
                    fillColor={theme.colors.fadedPrimary}
                  />
                  {coords && (
                    <LocationMarker
                      location={coords}
                      title="Current Location"
                      description="This is your current location"
                    />
                  )}
                </MapView>
              
            </View>
            {(props?.inReservation ? false : !open) && (
              <TimeFilter
                displayDay={true}
                displayExtendText={false}
                displayPickup={true}
                setStartDateTime={setStartDateTime}
                setEndDateTime={setEndDateTime}
              />
            )}
            <MapScreenBottomSheet
              onClose={onClose}
              onOpen={onOpen}
              inReservation={props.inReservation}
            />
          </View>
        )
      }
    </ThemeConsumer>
  );
};

export default MapScreen;
