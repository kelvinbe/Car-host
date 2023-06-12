import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { IStation, IVehicle } from '../../../../globaltypes'
import { useGetCurrentLocationQuery } from '../../../../redux/locationsSlice'
import Marker from '../Marker/Marker'
import { TRACKING_SERVICE } from '../../../../hooks/constants'

interface IProps extends Partial<IVehicle & {
    station?: Partial<IStation>
}> {
    map?: google.maps.Map
}

type setCoords = (data?: Partial<{
    data: Array<{
        latitude: number,
        longitude: number
    }>
    message: string,
    status: "success" | "error",
}>) => void

class VehicleTracker {
    ws: WebSocket
    constructor(id: string, setCoords: setCoords, onclose?: () => void, onerror?: () => void){
        this.ws = new WebSocket(`wss://${TRACKING_SERVICE}/vehiclelocation`)

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({
                vehicle_id: id
            }))
        }

        this.ws.onmessage = (message) => {
            const data = JSON.parse(message.data)
            setCoords(data)
        }

        this.ws.onclose = () => {
            onclose?.()
        }

        this.ws.onerror = () => {
            onerror?.()
        }

    }

}

function CarMarkerComponent( props: IProps ) {
    
    const { id, station } = props
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const {data: locationData} = useGetCurrentLocationQuery(id ?? "", {
        pollingInterval: 3000,
        skip: isEmpty(localStorage.getItem("idToken"))
    })

    useEffect(()=>{
        const ws = new VehicleTracker(id ?? "", (res)=>{
            if(isEmpty(res?.data)){
                setLatitude(()=>station?.latitude ?? 0)
                setLongitude(()=>station?.longitude ?? 0)
            }else{
                const coords = res?.data?.[0]
                setLatitude(()=>Number(coords?.latitude) ?? 0)
                setLongitude(()=>Number(coords?.longitude) ?? 0)
            }
        }, 
        ()=>{
            setLatitude(()=>station?.latitude ?? 0)
            setLongitude(()=>station?.longitude ?? 0)
        },
        ()=>{
            setLatitude(()=>station?.latitude ?? 0)
            setLongitude(()=>station?.longitude ?? 0)
        }
        )
    }, [station?.latitude, station?.longitude])


  return (
    <Marker
        map={props.map}
        position={{
            lat: latitude,
            lng: longitude
        }}
        title={
            `
                ${station?.name ?? "No station name"}
            `
        }
        icon={{
            // since no alternative has been provided in the design, I'll work with this image
            url: "/images/vehicle-marker.png",
            size: new google.maps.Size(100, 50),
            scaledSize: new google.maps.Size(100, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0.5, 0.5),
        }}
    />
  )
}

export default CarMarkerComponent