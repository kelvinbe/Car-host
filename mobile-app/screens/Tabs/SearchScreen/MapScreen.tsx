import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useReducer, useState, useRef } from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import MapView, { Circle, Marker } from 'react-native-maps'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import * as Location from "expo-location"
import LocationMarker from '../../../components/atoms/GeoMarkers/LocationMarker/LocationMarker'
import LocationMarkerIcon from "../../../assets/icons/location-marker.svg"
import TimeFilter from '../../../components/molecules/TimeFilter/TimeFilter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SearchScreenParamList } from '../../../types'
import MapScreenBottomSheet from '../../../components/organisms/MapScreenBottomSheet/MapScreenBottomSheet'
import PaymentBottomSheet from '../../../components/organisms/MapScreenBottomSheet/BottomSheetScreens/PaymentBottomSheet'


interface IProps {

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
        fontWeight: "500",
        width: "100%",
       
    },
    loadingText: {
        color: theme.colors.title,
        fontSize: 16,
        lineHeight: 16,
        textAlign: "center",
        fontWeight: "500",
    },
}))

interface IState {
    location: Location.LocationObject | null,
    errorMessage: null |string;
    loading?: boolean
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
    loading: false
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
    const opacity = useRef(new Animated.Value(0)).current

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

        getCoords().then(()=>{
            console.log("Location fetched")
        }).catch((e)=>{
            console.log(e)
        })
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
             { !open && <TimeFilter/>}
             <MapScreenBottomSheet
                onClose={onClose}
                onOpen={onOpen}
             />
         </View>)
        )}
    </ThemeConsumer>
   
  )
}

export default MapScreen