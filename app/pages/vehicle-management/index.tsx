import { Flex } from '@chakra-ui/react'
import React from 'react'
import BaseTable from '../../components/organism/Table/BaseTable/BaseTable'
import { IVehicle } from '../../globaltypes'
import { VehicleManagementTableColumns } from '../../utils/tables/TableTypes'
import { FlexColCenterStart } from '../../utils/theme/FlexConfigs'

const exampleVehicleManagementData: IVehicle[] = [
  {
    vehicleId: "xxxxx",
    vehicleType: "Sedan",
    vehicleMake: "Tesla",
    vehicleModel: "Model 3",
    color: "Black",
    hourlyRate: 10,
    seats: 4,
    vehiclePictures: [
      "https://images.unsplash.com/photo-1553260202-d1f2ce03298b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    ],
    coords: {
      latitude: 0,
      longitude: 0
    },
    locationId: "xxxxx",	
    status: "active",
    location: "San Francisco",
    transmission: "Automatic",
    year: 2020,
  }
]

function VehicleManagement() {
  return (
    <Flex {...FlexColCenterStart} w="full" >
      <BaseTable
        columns={VehicleManagementTableColumns}
        data={exampleVehicleManagementData}
        dataFetchFunction={() => {}}
      />
    </Flex>
  )
}

export default VehicleManagement

export function getStaticProps () {
  return {
    props: {
        authonly: true,
        dashboard: true,
        adminonly: false
    }
  }
}