import { Flex } from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import BaseInput from '../components/molecules/Input/BaseInput/BaseInput'
import WithHelperText from '../components/molecules/Input/WithHelperText/WithHelperText'
import CreatePassword from '../components/organism/Forms/CreatePassword/CreatePassword'
// import LiveMapComponent from '../components/organism/Maps/LiveMapComponent/LiveMapComponent'
import { app } from '../firebase/firebaseApp'
import { IVehicle } from '../globaltypes'
import { useGetCurrentLocationQuery } from '../redux/locationsSlice'
import { FlexColCenterCenter } from '../utils/theme/FlexConfigs'

const LiveMapComponent = dynamic(()=>import("../components/organism/Maps/LiveMapComponent/LiveMapComponent"), {
  ssr: false
})

/**
 * This page is for testing components incase Storybook doesnt meet testing needs, sharp solid background color for easy testing
 */

const exampleVehicles: IVehicle[] = [
  {
    color: "red",
    coords: {
      latitude: 6.5244,
      longitude: 3.3792
    },
    hourlyRate: 1000,
    location: "Lagos",
    locationId: "1",
    seats: 4,
    status: "active",
    transmission: "automatic",
    vehicleId: "1",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleType: "car",
    year: 2019 ,
    vehiclePictures: [
      "https://images.unsplash.com/photo-1547143379-3374bbefa14a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=697&q=80"
    ]
  }, {
    color: "red",
    coords: {
      latitude: 8.5244,
      longitude: 4.3792
    },
    hourlyRate: 1000,
    location: "Lagos",
    locationId: "1",
    seats: 4,
    status: "active",
    transmission: "automatic",
    vehicleId: "1",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleType: "car",
    vehiclePictures: [
      "https://images.unsplash.com/photo-1512668023544-749964af467a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    year: 2019
  }
]

function Sandbox() {

  return (
    <Flex {...FlexColCenterCenter} w="100vw" h="100vh" padding="20px" backgroundColor="white" >
        {/* <BaseInput
          placeholder="Email"
          formLabel='Email'
          onChangeText={(text)=>{
            console.log(text)
          }}
          
        /> */}
        {/* <WithHelperText
          placeholder="Email"
          formLabel='Email'
          errorMessage="ss"
          helperTextTop="ss"
          helperTextBottom="ss"
          onChangeText={()=>{
            console.log("text")
          }}\
          customStyle={{
            width: 200
          }}
        /> */}
        {/* <CreatePassword/> */}
        {/* <LiveMapComponent marketId="123" vehicles={exampleVehicles}
              /> */}
    </Flex>
    )
}

export default Sandbox