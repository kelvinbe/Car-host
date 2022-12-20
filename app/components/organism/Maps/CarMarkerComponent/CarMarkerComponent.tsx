import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { IVehicle } from '../../../../globaltypes'
import { useGetCurrentLocationQuery } from '../../../../redux/locationsSlice'
import Marker from '../Marker/Marker'

interface IProps extends IVehicle {
    map?: google.maps.Map
}

function CarMarkerComponent( props: IProps ) {
    
    const { vehicleId, vehicleMake, vehicleModel } = props
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const {data: locationData, isLoading, error} = useGetCurrentLocationQuery(vehicleId, {
        pollingInterval: 3000,
        skip: isEmpty(localStorage.getItem("idToken"))
    })

    useEffect(()=>{
        if(locationData){
            setLatitude(locationData.latitude)
            setLongitude(locationData.longitude)
        }
    }, [locationData])


  return (
    <Marker
        map={props.map}
        position={{
            lat: latitude,
            lng: longitude
        }}
        icon={{
            // since no alternative has been provided in the design, I'll work with this image
            url: "/icons/vehicle.svg",
            size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
        }}
    />
  )
}

export default CarMarkerComponent