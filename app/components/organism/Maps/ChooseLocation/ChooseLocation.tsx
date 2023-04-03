/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from "@googlemaps/react-wrapper";
import React from "react";
import Map from "../../../atoms/Maps/Map";

interface IChooseLocationProps {
  onChange: (location: { longitude: number, latitude: number }) => void,
  pin?: { lat: number, lng: number },
}
const ChooseLocation = (props: IChooseLocationProps) => {
  const { onChange, pin } = props
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    >
      <Map onChange={({lat, lng})=>onChange && onChange({
        longitude: lng,
        latitude: lat
      })} center={{ lat: 0, lng: 0 }} pin={pin} zoom={5} />

    </Wrapper>
  )
}

export default ChooseLocation