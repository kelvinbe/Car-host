/* eslint-disable react-hooks/exhaustive-deps */
import { last } from "lodash";
import React, { useRef, useEffect, useState } from "react";

interface Props {
    center: google.maps.LatLngLiteral;
    zoom: number;
    children?: React.ReactNode[];
    onChange?: (center: google.maps.LatLngLiteral) => void;
    pin?: { lat: number, lng: number }
}

const Map = (props: Props) => {
    const { center: { lat, lng }, children, zoom, pin } = props;
    const ref = React.useRef(null);
    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const prevMarkersRef = useRef<google.maps.Marker[]>([]);
    const [pins, ] = useState<string>("no pins")

    const addMarker = (location: google.maps.LatLngLiteral, map: google.maps.Map) => {
        last(prevMarkersRef.current)?.setMap(null);
        const marker = new google.maps.Marker({
            position: location,
            map,
        });
        prevMarkersRef.current?.push(marker);
        props.onChange && props.onChange(location)
    }


    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    center: {
                        lat: lat ?? 0,
                        lng: lng ?? 0,
                    },
                    zoom: zoom ?? 0,
                })
            );
        }

        if (map && pin) {
            addMarker(pin, map)
        }
    }, [ref, map, lat, lng, zoom, pins, pin?.lat, pin?.lng]);



    useEffect(() => {
        map && google.maps.event.addListener(map, "click", (event: {
            latLng: {
                lat: () => number;
                lng: () => number;
            }
        }) => {
            addMarker({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }, map)
        })
        return () => {
            map && google.maps.event.clearListeners(map, "click")
        }
    }, [map])

    return (
        <>
            <div ref={ref} style={{ height: "100%", width: "100%" }} data-testid='map'/>
            {children && React.Children.map(children, (child) => {
                if (React.isValidElement(child) && map) {
                    return React.cloneElement(child, { map: map } as {
                        map: google.maps.Map;
                    });
                }
            })}
        </>
    );

}

export default Map