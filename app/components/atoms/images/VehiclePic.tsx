import { Flex, chakra } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    image: string,
    size: "small" | "large"
}

function VehiclePic(props: IProps) {
  return (
    <chakra.img 
        borderRadius={ props.size === "small" ? 15 : 20 }
        style={{
            width: props.size === "small" ? 70 : props.size === "large" ?  330 : 70,
            height: props.size === "small" ? 40 : props.size === "large" ? 150 : 40,
            objectFit: "contain"
        }} 
        src={props.image}
        alt="vehicle"
    />
  )
}

export default VehiclePic