import { chakra } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    image?: string,
    size: "small" | "large" | "mid"
}

function VehiclePic(props: IProps) {
  return (
    <chakra.img 
        borderRadius={ props.size === "small" ? 15 : 22 }
        style={{
            width: props.size === "small" ? 70 : props.size === "large" ?  330 : 300,
            height: props.size === "small" ? 40 : props.size === "large" ? 150 : 100,
            objectFit: "contain"
        }} 
        src={props.image}
        alt="vehicle"
    />
  )
}

export default VehiclePic