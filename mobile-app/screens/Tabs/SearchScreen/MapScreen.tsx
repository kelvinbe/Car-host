import { Text, View, Animated, StatusBar } from 'react-native'
import React, { useEffect, useReducer, useState, useRef } from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import MapView, { Circle, Marker } from 'react-native-maps'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import * as Location from "expo-location"
import LocationMarker from '../../../components/atoms/GeoMarkers/LocationMarker/LocationMarker'
import TimeFilter from '../../../components/molecules/TimeFilter/TimeFilter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SearchScreenParamList } from '../../../types'
import MapScreenBottomSheet from '../../../components/organisms/MapScreenBottomSheet/MapScreenBottomSheet'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import useBookingActions from '../../../hooks/useBookingActions'


interface IProps {
    inReservation?: boolean,
}

type Props = IProps & NativeStackScreenProps<SearchScreenParamList, "MapScreen">

const useStyles = makeStyles((theme, props)=>({
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: theme.colors.white
    },
    mapContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    map: {
        width: "100%",
        height: "100%"
    },
    statusContainer: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.white

    },
    errorText: {
        color: theme.colors.error,
        fontSize: 16,
        lineHeight: 16,
        textAlign: "center",
        fontWeight: "500", fontFamily: "Lato_400Regular",
        width: "100%",
    },
    loadingText: {
        color: theme.colors.title,
        fontSize: 16,
        lineHeight: 16,
        textAlign: "center",
        fontWeight: "500", fontFamily: "Lato_400Regular",
    },
}))

interface IState {
    location: Location.LocationObject | null,
    errorMessage: null |string;
    loading?: boolean;
    hostCode?: string;
}
// change initialState when location bug is dealt with
const initialState: IState = {
    location: {
        coords: {
            latitude: 37.78825,
            longitude: -122.4324,
        } as any
    } as any,
    errorMessage: null,
    loading: false,
    hostCode: ""
}

const reducer = (state: IState, action: any) => {
    switch (action.type) {
        case "setLocation":
            return {
                ...state,
                location: action.payload,
                loading: false
            }
        case "setErrorMessage":
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
}



const MapScreen = (props: Props) => {
    const [state, dispatchAction] = useReducer(reducer, initialState)
    const styles = useStyles()
    const [open, setOpen] = useState(false)
    const { clearBookingState } = useBookingActions()
    const {
        setStartDateTime,
        setEndDateTime
    } = useBookingActions()

    const onOpen = () => {
        setOpen(true)
    }

    const onClose = () =>{
        setOpen(false)
    }

    

    const getCoords = async () =>{
        Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low
        }).then((location)=>{
            console.log(location)
            dispatchAction({
                type: "setLocation",
                payload: location
            })
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        // getCoords().then(()=>{
        //     console.log("Location fetched")
        // }).catch((e)=>{
        //     console.log(e)
        // })
        return ()=>{
            /* clearBookingState() */
            clearBookingState()
        }
    },[])

  return (
    <ThemeConsumer>
        {({theme})=>(
              state.loading ? (<View style={[styles.statusContainer]} >
                <Text style={[styles.loadingText]}>Loading...</Text>
                <Rounded onPress={getCoords} >
                    Refetch
                </Rounded>
                </View>): state.errorMessage ? (
                    <View style={styles.statusContainer} >
                        <Text style={styles.errorText}>{state.errorMessage}</Text>
                    </View>
                ) : (<View style={styles.container} >
                <View style={styles.mapContainer} >
                    {state?.location && <MapView 
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        mapType="mutedStandard"
                        initialRegion={{
                            latitude: state?.location?.coords?.latitude || 0,
                            longitude: state?.location?.coords?.longitude || 0,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        region={{
                            latitude: state?.location?.coords?.latitude || 0,
                            longitude: state?.location?.coords?.longitude || 0,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Circle 
                            center={{
                                latitude: state?.location?.coords?.latitude || 0,
                                longitude: state?.location?.coords?.longitude || 0,
                            }}
                            radius={300}
                            strokeColor={theme.colors.primary}
                            fillColor={theme.colors.fadedPrimary}
                        />
                        {state.location && 
                            <LocationMarker
                                location={state.location}
                                title="Current Location"
                                description="This is your current location"
                            />}
                    </MapView>}
                </View>
             { (props?.inReservation ? false : !open) && <TimeFilter setStartDateTime={setStartDateTime} setEndDateTime={setEndDateTime} />}
             <MapScreenBottomSheet
                onClose={onClose}
                onOpen={onOpen}
                inReservation={props.inReservation}
             />
         </View>)
        )}
    </ThemeConsumer>
   
  )
}

export default MapScreen