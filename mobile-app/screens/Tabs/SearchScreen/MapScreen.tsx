import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useReducer } from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import MapView, { Circle, Marker } from 'react-native-maps'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import * as Location from "expo-location"
import LocationMarker from '../../../components/atoms/GeoMarkers/LocationMarker/LocationMarker'
import LocationMarkerIcon from "../../../assets/icons/location-marker.svg"
import TimeFilter from '../../../components/molecules/TimeFilter/TimeFilter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SearchScreenParamList } from '../../../types'


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
    }
}))

interface IState {
    location: Location.LocationObject | null,
}

const initialState: IState = {
    location: null
}

const reducer = (state: IState, action: any) => {
    
    switch (action.type) {
        case "setLocation":
            return {
                ...state,
                location: action.payload
            }
        default:
            return state
    }
}

const MapScreen = (props: Props) => {
    const [state, dispatchAction] = useReducer(reducer, initialState)
    const styles = useStyles()

    const requestPermission = () => {
        Location.requestForegroundPermissionsAsync().then((permissionResponse)=>{
            // console.log("permissionResponse", permissionResponse)
            // console.log(permissionResponse)
        }).catch((e)=>{
            // console.log(e)
            // console.log("An error occured", e)
        })
    }

    const getCoords = () =>{
        Location.getCurrentPositionAsync().then((coords)=>{
            dispatchAction({
                type: "setLocation",
                payload: coords
            })
            // console.log("coords", coords)
        }).catch((e)=>{
            // console.log("An error occured")
        })
    }

    useEffect(()=>{
        getCoords()
    },[])

    useEffect(()=>{
        // console.log("state", state)
    }, [state.location])
  return (
    <ThemeConsumer>
        {({theme})=>(
             <View style={styles.container} >
        
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
             <TimeFilter/>
             
         </View>
        )}
    </ThemeConsumer>
   
  )
}

export default MapScreen